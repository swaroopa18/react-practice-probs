import React from "react";
import { useState } from "react";

const AccordionItem = ({ title, content, isOpen, toggle }) => {
  return (
    <div className="wrapper">
      <div className="accordion-wrapper" onClick={toggle}>
        {title}
        <span aria-hidden={true} className="accordion-icon" />
      </div>
      {isOpen && <div>{content}</div>}
    </div>
  );
};

export default function Accordion() {
  const [accordianState, setAccordianState] = useState({
    html: false,
    css: false,
    javascript: false,
  });
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

  const toggleAccordion = (val) =>
    setAccordianState({
      ...accordianState,
      [val]: !accordianState[val],
    });
  return (
    <div>
      {items.map(({ key, title, content }) => (
        <AccordionItem
          key={key}
          title={title}
          content={content}
          isOpen={accordianState[key]}
          toggle={() => toggleAccordion(key)}
        />
      ))}
    </div>
  );
}
