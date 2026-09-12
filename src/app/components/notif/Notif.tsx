"use client";

import Swal from "sweetalert2";

type data = {
  title: string;
  time: string;
  type: string;
  message: string;
  read: boolean;
};
type dataProps = {
  data: data[];
};
function alertMassage(message: string) {
  Swal.fire(message);
}
function Notif({ data }: dataProps) {
  return (
    <div className="mt-10 ml-3 w-3/4">
      <div className="grid grid-cols-1 grid-rows-1 gap-7">
        {data.map((item) => (
          <div
            key={item.title}
            onClick={() => alertMassage(item.message)}
            className="bg-white rounded-2xl shadow-xl p-5 flex items-center gap-5 transition-all duration-200 hover:-translate-y-1"
          >
            {item.read === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 128 128"
                className="fill-green"
              >
                <path d="M 64 1 C 29.3 1 1 29.3 1 64 C 1 98.7 29.3 127 64 127 C 98.7 127 127 98.7 127 64 C 127 29.3 98.7 1 64 1 z M 64 7 C 95.4 7 121 32.6 121 64 C 121 95.4 95.4 121 64 121 C 32.6 121 7 95.4 7 64 C 7 32.6 32.6 7 64 7 z M 93.775391 38 C 93.000391 38.05 92.249219 38.4 91.699219 39 L 63.800781 71.599609 L 51.099609 58.900391 C 49.899609 57.700391 48.000391 57.700391 46.900391 58.900391 C 45.700391 60.100391 45.700391 61.999609 46.900391 63.099609 L 61.900391 78.099609 C 62.500391 78.699609 63.2 79 64 79 L 64.099609 79 C 64.899609 79 65.700781 78.6 66.300781 78 L 96.300781 43 C 97.400781 41.7 97.2 39.800781 96 38.800781 C 95.35 38.200781 94.550391 37.95 93.775391 38 z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                className="fill-red"
                viewBox="0,0,256,256"
              >
                <g
                  fillRule="nonzero"
                  stroke="none"
                  strokeWidth="1"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  strokeMiterlimit="10"
                  strokeDasharray=""
                  strokeDashoffset="0"
                  fontFamily="none"
                  fontWeight="none"
                  fontSize="none"
                  className="mix-blend-mode: normal"
                >
                  <g transform="scale(5.12,5.12)">
                    <path d="M25,2c-12.69047,0 -23,10.30953 -23,23c0,12.69047 10.30953,23 23,23c12.69047,0 23,-10.30953 23,-23c0,-12.69047 -10.30953,-23 -23,-23zM25,4c11.60953,0 21,9.39047 21,21c0,11.60953 -9.39047,21 -21,21c-11.60953,0 -21,-9.39047 -21,-21c0,-11.60953 9.39047,-21 21,-21zM32.99023,15.98633c-0.26377,0.00624 -0.51439,0.11645 -0.69727,0.30664l-7.29297,7.29297l-7.29297,-7.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l7.29297,7.29297l-7.29297,7.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l7.29297,-7.29297l7.29297,7.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-7.29297,-7.29297l7.29297,-7.29297c0.29724,-0.28583 0.38857,-0.7248 0.23,-1.10546c-0.15857,-0.38066 -0.53454,-0.62497 -0.94679,-0.61524z"></path>
                  </g>
                </g>
              </svg>
            )}
            <div className="flex flex-col items-start justify-start flex-1">
              <p className="font-bold">{item.title}</p>

              <div className="text-sm text-text-muted flex justify-between w-full ">
                <span>{item.message}</span>
                <span className="shrink-0">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notif;
