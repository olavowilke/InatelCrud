export interface GetAllUsersDto {
  "page": number,
  "per_page": number,
  "total": number,
  "total_pages": number,
  "data": [
    {
      "id": number,
      "email": string,
      "first_name": string,
      "last_name": string,
      "avatar": string
    },
  ],
  "support": {
    "url": string,
    "text": string
  }
}
