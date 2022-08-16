
export const resume = async (args: string[]): Promise<string> => {
  setTimeout(function () {
    window.open('https://github.com/AmirH-KHALI/amirh-khali.github.io/blob/master/docs/AmirH_CV.pdf');
  }, 1000);

  return 'Opening Resume...';
};
