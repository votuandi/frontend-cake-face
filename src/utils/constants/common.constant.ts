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
