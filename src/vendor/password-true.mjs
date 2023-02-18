import trans from './Trans.mjs';
function passCheck(name, birthday, pass) {
  // let user_name = "пётр";
  // let birthday = "01.01.01"; для тестов
  // let pass = "01.01.0"
  let i, j;
  let count = 0;
  if (pass.indexOf(trans(user_name)) >= 0) {
    return 'Ваш pass не должен совпадать с трасплитом имени';
  } else {
    if (pass.indexOf(birthday) >= 0) {
      return 'Ваш pass не должен совпадать с датой рождения';
    } else {
      if (pass.indexOf(' ') >= 0) {
        return 'Ваш пароль должен быть без пробелов';
      } else {
        for (i = 0; i < pass.length; i++) {
          for (j = 0; j < 10; j++) {
            if (pass[i] == j) {
              count++;
            }
          }
          if (i + 1 == pass.length) {
            if (count == 0) {
              return 'Добавьте числа в свой pass';
            } else {
              return 'okey';
            }
          }
        }
      }
    }
  }
}
