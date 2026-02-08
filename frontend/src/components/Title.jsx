import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <p className="text-gray-500">
        {text1} <span className="font-medium text-gray-700">{text2}</span>
      </p>
      <p className="bg-gray-700 w-8 sm:w-12 h-px sm:h-0.5"></p>
    </div>
  );
};

export default Title;
