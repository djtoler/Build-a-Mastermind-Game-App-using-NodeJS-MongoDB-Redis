export const default_mode = () => {};
export const super_easy_mode = () => {};
export const hard_mode = () => {};
export const super_hard_mode = () => {};

export const easy_mode = () => {
    let guess_evaluation;
    let hi_num = 9999;
    let low_num = 0000;

    const lower = () => {
      hi_num = test;
      return `lower , secret number is between ${low_num}  to ${test - 1}`;
    };

    const higher = () => {
      low_num = test;
      return `higher, secret number is between ${test + 1} to ${hi_num}`;
    };

    console.log(
        "return: " + guess_evaluation,
        "low_num: " + low_num,
        "hi_num: " + hi_num
      );
    return guess_evaluation = random_number < test ? lower() : higher();
  };

