import { PrismaClient, templates } from '@prisma/client';

export default class PagedTemplateListDto {
  page: number;
  pageSize: number;
  totalCount: number;
  templates: Array<templates>;

  constructor(
    page: number,
    pageSize: number,
    totalCount: number,
    templates: Array<templates>
  ) {
    this.page = page;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.templates = templates;
  }
}
