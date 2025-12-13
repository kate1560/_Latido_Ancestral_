import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

// GET /api/products/[id] - Get single product by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const product = products.find(p => p.id === id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product (admin only - placeholder)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const body = await request.json();

    // TODO: Add authentication check
    // TODO: Add validation
    // TODO: Update in database

    return NextResponse.json({
      success: true,
      message: 'Product update endpoint - To be implemented with database',
      data: { id, ...body }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (admin only - placeholder)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    // TODO: Add authentication check
    // TODO: Delete from database

    return NextResponse.json({
      success: true,
      message: 'Product deletion endpoint - To be implemented with database',
      deletedId: id
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
