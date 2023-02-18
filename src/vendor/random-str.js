function randomStructuredClone(count){
    str_lover_engl_and_num = ["a", "b", "c", "d", 
        "e", "f", "g", "h", "i", "j", "k" ,"l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v" ,"w", "x" ,"y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    str = '';
    if (count == null){
        count = 5;
    }
    for(i = 0; i < count; i++){
        str = str + str_lover_engl_and_num[Math.floor(Math.random()*str_lover_engl_and_num.length)]; 
    }
    return str;
}
console.log(randomStructuredClone(15));