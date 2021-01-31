import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  enabled: boolean;
  logo: string;
  title: string;
  link: string;
};

//function DisableClick { (event) => event.preventDefault() };

export function ImportSourceBox(props: Props) {
  return (
    <div className="my-5 px-5 w-1/4 overflow-hidden sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4">
      <Link
        to={props.link}
        className={`${
          props.enabled == false && 'cursor-default'
          } hidden md:flex justify-center`}
        /*onClick={ props.enabled == false && {DisableClick} }*/
        >
        <div className="flex flex-col">
          <h1 className="pb-4">{props.title}</h1>
          <img
            src={props.logo}
            alt="imdb logo"
            className={`${
              props.enabled == false && 'opacity-25'
              } flex-shrink-0 p-4 h-56`}
          />
        </div>
      </Link>
    </div>
  );
}

export default ImportSourceBox;
