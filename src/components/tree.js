import React, { useState } from 'react'; 

const Node = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false); 

  const handleToggle = () => {
    setIsOpen(!isOpen);
  }; 

  return (
    <div>
      <div onClick={handleToggle}>
        {node.name}
      </div>
      {isOpen && node.children && node.children.map(child => (
        <Node key={child.id} node={child} />
      ))}
    </div>
  );
}; 

const TreeView = ({ data }) => {
  return (
    <div>
      {data.map(node => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
}; 

export default TreeView;
