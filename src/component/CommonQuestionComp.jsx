const CommonQuestionComp = ({ heading, content }) => {
  return (
    <>
      <div className="flex flex-col gap-2 md:gap-5">
        {heading ? <h2 className=" commonQuesH2">{heading}</h2> : null}

        <div className="flex flex-col gap-2 md:gap-3">
          {content?.length > 0 && content?.map((paragraph, index) => (
            <p
              key={index}
              className="commonQuesP"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default CommonQuestionComp;
