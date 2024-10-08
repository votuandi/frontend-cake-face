import { ARTICLE_CONTENT_TYPES, ARTICLE_CONTENT_WIDTHS } from '@/types/common'

export const LANGUAGES = [
  {
    VALUE: 'zh-CN',
    DISPLAY: '繁',
  },
  {
    VALUE: 'en-US',
    DISPLAY: 'ENG',
  },
  {
    VALUE: 'zh-HK',
    DISPLAY: '簡',
  },
]

export const ARTICLE_CONTENT_LIST: ARTICLE_CONTENT_TYPES[] = ['text', 'image', 'youtube']

export const ARTICLE_CONTENT_WIDTH_LIST: ARTICLE_CONTENT_WIDTHS[] = ['960px', '1200px', '100%']

export const QUILL_MODULES = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }], // add this line for text color
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], // Add alignment options
    ['clean'],
  ],
}

export const QUILL_FORMAT = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'color',
  'align',
  'background', // add this line for text color
]

export type SORT_BY_TYPE = 'name' | 'createDate' | 'viewAmount' | 'downloadAmount' | 'isTrendy'

export const CAKE_FACE_SORT_LIST: Array<{ title: string; value: SORT_BY_TYPE }> = [
  { title: 'Theo tên', value: 'name' },
  { title: 'Mới nhất', value: 'createDate' },
  { title: 'Lượt xem', value: 'viewAmount' },
  { title: 'Lượt tải', value: 'downloadAmount' },
]

export type ROLE_TYPE = 'admin' | 'client' | 'user'

export const FONTS = [
  'Baloo 2', 'Baloo Bhaijaan 2', 'Cormorant', 'Danfo', 'Dancing Script', 'Gluten',
  'Grandstander', 'Grenze Gotisch', 'Jaro', 'Lemonada', 'Merienda', 'Open Sans', 
  'Oswald', 'Playfair', 'Playfair Display', 'Roboto', 'Roboto Slab', 
  'Sansita Swashed', 'Shantell Sans', 'Tektur'
]

export const TEXT_SIZE = [1,2,4,6,8,9,10,12,14,16,18,20,24,28,32,36,40,48,56,64,72,80,100]
