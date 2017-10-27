/**
 * Created by zrshz on 2017/10/26.
 */

var code = 0;
var answer = new Array();

function loadJson() {

    $.getJSON("js/list.json","",function (data) {

        $.each(data.qlist,function (i,item) {

            var questionName = "#question-"+i + " h1";
            $(questionName).html( i+ 1 + "/9 :" + item.title);

            var questionImage = "#question-"+i +" .pic img";
            $(questionImage).attr("src",item.image);

            var answer = "#question-"+i + " .answer";


            if(i != 8)
            {
                $.each(item.choice,function (n,select) {

                    var answerName = select.title;
                    var c = select.weight;

                    $(answer).append("<button class=\"choice_button\" onclick=\"submitText(this)\" value='"
                        + i +"+" + c + "'>"+ answerName + "</button>");
                });
            }
            else {
                $.each(item.choice, function (n, select) {

                    var answerImg = select.image;
                    var c = select.weight;

                    $(answer).append("<div class=\"type-image\"><button class=\"choice_button\" onclick=\"submitText(this)\" value='"
                        + i + "+" + c + "'><img src=\'" + answerImg + "'></button></div>");
                });
            }
        })
        answer = data.answer;
    })
}
$(document).ready(loadJson);


function hideQuestionMain() {

    $("#question-main").hide();
    $("#question-0").show();
}

function submitText(obj) {

    // i + select
    var num = obj.value;

    var i = num.substr(0,1);
    var c = num.substr(2,1);

    code += parseInt(c);
    var next = parseInt(i) + 1;

    $("#question-" + i).hide();


    if(next != "9")
    {
        $("#question-" + next).show();
    }
    else
    {
        $.each(answer,function (index,item){

            var min = parseInt(item.min);
            var max = parseInt(item.max);

            if(code >= min && code < max){

                var resultId = "#question-answer .result";
                var resultId_h2 = resultId + " h2";
                var resultId_p = resultId + " p";

                $(resultId_h2).html(item.title);
                $(resultId_p).html(item.desc);
                return false;
            }
        })

        $("#question-answer").show();
    }

}
