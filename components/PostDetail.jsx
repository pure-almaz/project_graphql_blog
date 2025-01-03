import React from 'react';

import moment from 'moment';
import Image from 'next/image';

const PostDetail = ({ post }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text || '';
  
    // Handle formatting options
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{modifiedText}</b>;
      }
      if (obj.italic) {
        modifiedText = <em key={index}>{modifiedText}</em>;
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{modifiedText}</u>;
      }
    }
  
    // Render based on type
    switch (type) {
      case 'heading-two':
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {obj.children?.map((child, i) =>
              getContentFragment(i, child.text, child, child.type)
            )}
          </h2>
        );
      case 'heading-three':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {obj.children?.map((child, i) =>
              getContentFragment(i, child.text, child, child.type)
            )}
          </h3>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-xl text-gray-700 font-bold mb-4">
            {obj.children?.map((child, i) =>
              getContentFragment(i, child.text, child, child.type)
            )}
          </h4>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {obj.children?.map((child, i) =>
              getContentFragment(i, child.text, child, child.type)
            )}
          </p>
        );
      case 'image':
        return (
          <img
            key={index}
            src={obj.src}
            alt={obj.altText || 'Image'}
            title={obj.title || ''}
            className="w-full h-auto mb-4"
            style={{ maxWidth: `${obj.width}px`, height: 'auto' }}
          />
        );
      case 'unordered-list':
      case 'bulleted-list':
        return (
          <ul key={index} className="list-disc ml-6 mb-4">
            {obj.children?.map((child, i) =>
              getContentFragment(i, null, child, child.type)
            )}
          </ul>
        );
      case 'ordered-list':
        return (
          <ol key={index} className="list-decimal ml-6 mb-4">
            {obj.children?.map((child, i) =>
              getContentFragment(i, null, child, child.type)
            )}
          </ol>
        );
      case 'list-item':
        return (
          <li key={index}>
            {obj.children?.map((child, i) =>
              getContentFragment(i, child.text, child, child.type)
            )}
          </li>
        );
      case 'list-item-child':
        return obj.children?.map((child, i) =>
          getContentFragment(i, child.text, child, child.type)
        );
      case 'link':
        return (
          <a
            key={index}
            href={obj.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {obj.children?.map((child, i) =>
              getContentFragment(i, child.text, child, child.type)
            )}
          </a>
        );
        case 'table':
          return (
            <table key={index} className="table-auto border-collapse border border-gray-300 mb-8">
              {obj.children?.map((child, i) =>
                getContentFragment(i, null, child, child.type)
              )}
            </table>
          );
        case 'table_body':
          return (
            <tbody key={index}>
              {obj.children?.map((child, i) =>
                getContentFragment(i, null, child, child.type)
              )}
            </tbody>
          );
        case 'table_row':
          return (
            <tr key={index} className="border border-gray-300">
              {obj.children?.map((child, i) =>
                getContentFragment(i, null, child, child.type)
              )}
            </tr>
          );
        case 'table_cell':
          return (
            <td key={index} className="border border-gray-300 px-4 py-2">
              {obj.children?.map((child, i) =>
                getContentFragment(i, child.text, child, child.type)
              )}
            </td>
          );
        default:
          return modifiedText;
    }
  };
  
  return (
    <>
      <div style={{backgroundColor:"white"}} className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img src={post.featuredImage.url} alt={post.title} className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <Image
                alt={post.author.name}
                height="27"
                width="27"
                className="align-middle rounded-full"
                style={{border:"1px solid #35185A"}}
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg italic">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700 italic">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="#35185A">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.json.children.map((typeObj, index) => {
            return getContentFragment(index, null, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
