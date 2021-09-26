/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import '../../styles/ckeditor.css';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import AutoImage from '@ckeditor/ckeditor5-image/src/autoimage';
import AutoLink from '@ckeditor/ckeditor5-link/src/autolink';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import DataFilter from '@ckeditor/ckeditor5-html-support/src/datafilter';
import DataSchema from '@ckeditor/ckeditor5-html-support/src/dataschema';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import FindAndReplace from '@ckeditor/ckeditor5-find-and-replace/src/findandreplace';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import HtmlComment from '@ckeditor/ckeditor5-html-support/src/htmlcomment';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import List from '@ckeditor/ckeditor5-list/src/list';
import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import MediaEmbedToolbar from '@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import SourceEditing from '@ckeditor/ckeditor5-source-editing/src/sourceediting';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

const plugins = [
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  DataFilter,
  DataSchema,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HtmlComment,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListStyle,
  MediaEmbed,
  MediaEmbedToolbar,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  WordCount
];

const items = [
  'undo',
  'redo',
  '|',
  'findAndReplace',
  '|',
  'link',
  '|',
  'insertTable',
  'pageBreak',
  '|',
  'code',
  'codeBlock',
  '|',
  'mediaEmbed',
  'htmlEmbed',
  'sourceEditing',
  '-',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'subscript',
  'superscript',
  'removeFormat',
  '|',
  'numberedList',
  'bulletedList',
  'outdent',
  'indent',
  'todoList',
  'blockQuote',
  'alignment',
  '-',
  'heading',
  '|',
  'fontFamily',
  '|',
  'fontSize',
  '|',
  'fontColor',
  'fontBackgroundColor',
  'highlight',
  'specialCharacters'
];

const toolbar = {
  items,
  shouldNotGroupWhenFull: true
};

const heading = {
  options: [
    { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
    {
      model: 'heading1',
      view: 'h1',
      title: '제목1',
      class: 'ck-heading_heading1'
    },
    {
      model: 'heading2',
      view: 'h2',
      title: '제목2',
      class: 'ck-heading_heading2'
    },
    {
      model: 'heading3',
      view: 'h3',
      title: '제목3',
      class: 'ck-heading_heading3'
    },
    {
      model: 'heading4',
      view: 'h4',
      title: '제목4',
      class: 'ck-heading_heading4'
    },
    {
      model: 'heading5',
      view: 'h5',
      title: '제목5',
      class: 'ck-heading_heading5'
    },
    {
      model: 'heading6',
      view: 'h6',
      title: '제목6',
      class: 'ck-heading_heading6'
    }
  ]
};

const fontSize = {
  options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36]
};

const alignment = {
  options: ['justify', 'left', 'center', 'right']
};

const table = {
  contentToolbar: [
    'tableColumn',
    'tableRow',
    'mergeTableCells',
    'tableCellProperties',
    'tableProperties'
  ]
};

const image = {
  resizeUnit: 'px',
  toolbar: [
    'imageStyle:alignLeft',
    'imageStyle:full',
    'imageStyle:alignRight',
    'imageStyle:inline',
    'imageStyle:block',
    'imageStyle:side',
    '|',
    'imageTextAlternative',
    'linkImage'
  ],
  styles: ['full', 'alignLeft', 'alignRight'],
  type: ['JPEG', 'JPG', 'GIF', 'PNG']
};

const typing = {
  transformations: {
    remove: [
      'enDash',
      'emDash',
      'oneHalf',
      'oneThird',
      'twoThirds',
      'oneForth',
      'threeQuarters'
    ]
  }
};

const mediaEmbed = {
  previewsInData: true
};

const config = placeholder => ({
  plugins,
  toolbar,
  heading,
  fontSize,
  alignment,
  table,
  image,
  typing,
  mediaEmbed,
  placeholder
});

const Editor = props => {
  const { onChange, data, placeholder } = props;

  return (
    <CKEditor
      data={data}
      editor={ClassicEditor}
      config={config(placeholder)}
      onChange={onChange}
    />
  );
};

export default Editor;
