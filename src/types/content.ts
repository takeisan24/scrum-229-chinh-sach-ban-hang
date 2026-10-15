/** Cac gia tri refType/contentType dung cho /portal/contents/get */
export type ContentRefType = 'PROJECT';
export type ContentType = 'POLICY';

export interface GetContentParams {
  refId: string | number;
  refType: ContentRefType;
  contentType: ContentType;
}

/**
 * TODO(SCRUM-229): shape nay dang la PHONG DOAN.
 * Phai xac nhan lai voi BE khi goi duoc API that roi sua.
 */
export interface ContentResponse {
  id: string | number;
  refId: string | number;
  refType: ContentRefType;
  contentType: ContentType;
  /** HTML tho tu CMS — BAT BUOC sanitize truoc khi render */
  content: string;
  updatedAt?: string;
}
