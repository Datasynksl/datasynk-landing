// app/api/dataset/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import fs from 'fs/promises';
import { supabase } from "@/lib/supabase"

interface Dataset {
  id: string
  name: string
  description: string
  file_path: string
  file_type: string
  size: number
  parameters: any
  sample_data: any
  tags: string[]
  created_at: string
  updated_at: string
  access_count: number
  view_count: number
  like_count: number
  download_count: number
  share_count: number
  comment_count: number
  avg_rating: number
  category: string
  sector: string
}


// Check if environment variables are defined
if (supabase) {
  console.error('Missing Supabase environment variables');
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: datasetId } = await context.params;

    let filters = {};
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      try {
        const text = await request.text();
        if (!text) {
          console.log('Request body is empty');
        } else {
          filters = JSON.parse(text);
          console.log('Parsed filters:', filters);
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        return NextResponse.json(
          { error: 'Invalid JSON in request body' },
          { status: 400 }
        );
      }
    }

    const { name, category, limit } = filters;

    // Fetch dataset metadata from Supabase
    const { data: dataset, error } = await supabase
      .from('datasets')
      .select('*')
      .eq('id', datasetId)
      .single();

    if (error || !dataset) {
      console.log('Supabase error:', error);
      return NextResponse.json(
        { error: 'Dataset not found' },
        { status: 404 }
      );
    }

    // Fetch file from Supabase Storage
    const filePath = dataset.file_path;
    let rawData;

    console.log('Fetching file from:', filePath);

    // Use Supabase Storage to download the file
    const { data: fileData, error: storageError } = await supabase
      .storage
      .from('datasets') // Adjust bucket name if different
      .download(filePath.split('/storage/v1/object/public/datasets/')[1]);

    if (storageError) {
      console.error('Storage error:', storageError);
      return NextResponse.json(
        { error: 'Failed to fetch file from storage' },
        { status: 500 }
      );
    }

    // Convert Blob to text
    const fileContent = await fileData.text();

    if (filePath.endsWith('.json')) {
      rawData = JSON.parse(fileContent);
    } else if (filePath.endsWith('.csv')) {
      rawData = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      });
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format' },
        { status: 400 }
      );
    }

    // Apply filters
    let filteredData = [...rawData];

    if (name) {
      filteredData = filteredData.filter(item => 
        item.name?.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (category) {
      filteredData = filteredData.filter(item => 
        item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (limit && Number.isInteger(Number(limit))) {
      filteredData = filteredData.slice(0, Number(limit));
    }

    return NextResponse.json({
      data: filteredData,
      total: filteredData.length,
      datasetId: datasetId
    });

  } catch (error) {
    console.error('Full error details:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Fetch dataset metadata from Supabase
    const { data: dataset, error } = await supabase
      .from("datasets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (!dataset) {
      return NextResponse.json({ error: "Dataset not found" }, { status: 404 });
    }

    // Fetch file from Supabase Storage
    const filePath = dataset.file_path;
    let rawData;

    console.log('Fetching file from:', filePath);

    // Use Supabase Storage to download the file
    const { data: fileData, error: storageError } = await supabase
      .storage
      .from('datasets') // Adjust bucket name if different
      .download(filePath.split('/storage/v1/object/public/datasets/')[1]);

    if (storageError) {
      console.error('Storage error:', storageError);
      return NextResponse.json(
        { error: 'Failed to fetch file from storage' },
        { status: 500 }
      );
    }

    // Convert Blob to text
    const fileContent = await fileData.text();

    if (filePath.endsWith('.json')) {
      rawData = JSON.parse(fileContent);
    } else if (filePath.endsWith('.csv')) {
      rawData = parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      });
    } else {
      return NextResponse.json(
        { error: 'Unsupported file format' },
        { status: 400 }
      );
    }

    // Update metrics (keeping this from your original GET)
    await supabase.rpc("update_all_dataset_metrics", { dataset_id: id });

    return NextResponse.json({
      data: rawData,
      total: rawData.length,
      datasetId: id
    });

  } catch (error) {
    console.error("Error fetching dataset:", error);
    return NextResponse.json(
      { error: "Failed to fetch dataset", details: error.message },
      { status: 500 }
    );
  }
}
