import Image from "next/image";
import Link from "next/link";

const BetaWatermark = () => {
  return (
    <div className="opacity-50 absolute right-2 top-2 flex items-center justify-center text-xs">
      <Image
        className="mr-2"
        src="/icons/exclamation.svg"
        alt="exclamation mark"
        width={20}
        height={20}
      />
      <div className="flex flex-col">
        <p className="text-failure">
          This is a beta version of the app. Your data will may be removed
          eventually.
        </p>
        <p className="text-failure">
          Please report any bugs to github issues page.
        </p>
        <Link
          href={"https://github.com/Mert18/guessers-client/issues"}
          className="text-primary-default"
        >
          Click here to go to the github issues.
        </Link>
      </div>
    </div>
  );
};

export default BetaWatermark;
