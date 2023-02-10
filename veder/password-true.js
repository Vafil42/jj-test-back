function trans(str) {
    abc_lover = ["а-ac", "б-b", "в-v", "г-g", "д-d", "е-e", "ё-yo", "ж-zh", "з-z", "и-i", "й-yi", "к-k", "л-l", "м-m", "н-n", "о-o", "п-p", "р-r", "с-s", "т-t", "у-u", "ф-f", "х-kh", "ц-tc", "ч-ch", "ш-sh", "щ-shch", "ъ-\'", "ы-y", "ь\"", "э-e", "ю-yu", "я-ya"];
    str1 = "";
    for (let i = 0; i < str.length; i++) {
        for (let j = 0; j < abc_lover.length; j++) {
            if (str[i] == abc_lover[j].substring(0, 1)) {
                str1 = str1 + abc_lover[j].substring(2);
            }
        }
    }
    // console.log(str1);
    return str1;
}
user_name = "пётр";
birthday = "01.01.01";
pass = "01.01.0"
if(pass.indexOf(trans(user_name)) >= 0){
    console.log("Ваш pass не должен совпадать с трасплитом имени")
}else{
    if(pass.indexOf(birthday) >= 0){
        console.log("Ваш pass не должен совпадать с датой рождения");
    }else{
        if(pass.indexOf(" ") >= 0){
            console.log("Ваш пароль должен быть без пробелов");     
        } else{
            for(i = 0; i < 10; i++){
                if(pass.indexOf("\i") < 0){
                    console.log("Добавьте числа в ваш pass")
                }
            }
        }
    }
}