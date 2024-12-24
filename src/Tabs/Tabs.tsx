import React, { useState } from 'react';
export default function Tabs() {
  const items = [
    {
      key: "html",
      title: "HTML",
      content:
        "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
    {
      key: "css",
      title: "CSS",
      content:
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
      key: "javascript",
      title: "JavaScript",
      content:
        "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    },
  ];
  const [content, setContent] = useState('')
  const [activeTab, setActiveTab] = useState('')

  return (
    <div>
      <div className='tabs'>
        {items.map(({ key, title, content }) =>
          <button className={activeTab == key ? "active" : 'button'}
            onClick={() => { setContent(content); setActiveTab(key) }}
            key={key}>
            {title}
          </button>)}
      </div>
      <div>
        <p>
          {content}
        </p>
      </div>
    </div>
  );
}
