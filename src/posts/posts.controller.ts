import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ValidationPipe, UseFilters } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/cloudinary/file-upload.service';
import { QueryFailedFilter } from 'src/utils/failed.filter';

@Controller('posts')
@UseFilters(QueryFailedFilter)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly fileUploadService: FileUploadService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body(ValidationPipe) createPostDto: CreatePostDto) {
    
    const uploadResult = await this.fileUploadService.uploadImage(file)
    createPostDto.imageUrl = uploadResult.url;

    return this.postsService.create(createPostDto)

  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
