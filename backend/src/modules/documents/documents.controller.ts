import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { DocumentType } from '@prisma/client';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() file: any,
    @Body()
    body: {
      listingId: string;
      userId: string;
      type: DocumentType;
      title: string;
      description?: string;
      isPublic?: boolean;
    },
  ) {
    return this.documentsService.uploadDocument({
      ...body,
      file,
      isPublic: body.isPublic === true || String(body.isPublic) === 'true',
    });
  }

  @Get('listing/:listingId')
  async getListingDocuments(
    @Param('listingId') listingId: string,
    @Query('userId') userId?: string,
  ) {
    return this.documentsService.getDocumentsByListing(listingId, userId);
  }

  @Get('listing/:listingId/type/:type')
  async getDocumentsByType(
    @Param('listingId') listingId: string,
    @Param('type') type: DocumentType,
    @Query('userId') userId?: string,
  ) {
    return this.documentsService.getDocumentsByType(listingId, type, userId);
  }

  @Get(':id')
  async getDocument(@Param('id') id: string, @Query('userId') userId?: string) {
    return this.documentsService.getDocumentById(id, userId);
  }

  @Put(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body()
    body: {
      userId: string;
      title?: string;
      description?: string;
      isPublic?: boolean;
    },
  ) {
    return this.documentsService.updateDocument(id, body.userId, {
      title: body.title,
      description: body.description,
      isPublic: body.isPublic,
    });
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string, @Query('userId') userId: string) {
    return this.documentsService.deleteDocument(id, userId);
  }
}
