import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DocumentType } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async uploadDocument(data: {
    listingId: string;
    userId: string;
    type: DocumentType;
    title: string;
    description?: string;
    file: any; // Express.Multer.File
    isPublic?: boolean;
  }) {
    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `real-estate/documents/${data.listingId}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      uploadStream.end(data.file.buffer);
    });

    return this.prisma.document.create({
      data: {
        listingId: data.listingId,
        userId: data.userId,
        type: data.type,
        title: data.title,
        description: data.description,
        fileUrl: result.secure_url,
        fileName: data.file.originalname,
        fileSize: data.file.size,
        mimeType: data.file.mimetype,
        isPublic: data.isPublic ?? false,
      },
    });
  }

  async getDocumentsByListing(listingId: string, userId?: string) {
    const where: any = { listingId };

    // If user not specified, only return public documents
    if (!userId) {
      where.isPublic = true;
    } else {
      // User can see their own documents + public documents
      where.OR = [{ isPublic: true }, { userId }];
    }

    return this.prisma.document.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getDocumentById(id: string, userId?: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        listing: true,
        user: true,
      },
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // Check access rights
    if (!document.isPublic && document.userId !== userId) {
      throw new Error('Unauthorized access to document');
    }

    return document;
  }

  async updateDocument(
    id: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      isPublic?: boolean;
    },
  ) {
    // Verify ownership
    const document = await this.prisma.document.findFirst({
      where: { id, userId },
    });

    if (!document) {
      throw new Error('Document not found or unauthorized');
    }

    return this.prisma.document.update({
      where: { id },
      data,
    });
  }

  async deleteDocument(id: string, userId: string) {
    // Verify ownership
    const document = await this.prisma.document.findFirst({
      where: { id, userId },
    });

    if (!document) {
      throw new Error('Document not found or unauthorized');
    }

    // Delete from Cloudinary
    const publicId = this.extractPublicId(document.fileUrl);
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      } catch (error) {
        console.error('Failed to delete from Cloudinary:', error);
      }
    }

    return this.prisma.document.delete({
      where: { id },
    });
  }

  async getDocumentsByType(listingId: string, type: DocumentType, userId?: string) {
    const where: any = { listingId, type };

    if (!userId) {
      where.isPublic = true;
    } else {
      where.OR = [{ isPublic: true }, { userId }];
    }

    return this.prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  private extractPublicId(url: string): string | null {
    try {
      const matches = url.match(/\/([^/]+)\.[^.]+$/);
      if (matches && matches[1]) {
        return matches[1];
      }
    } catch (error) {
      console.error('Failed to extract public ID:', error);
    }
    return null;
  }
}
