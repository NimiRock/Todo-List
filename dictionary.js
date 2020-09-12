$(function(){
    $(".btn").click(function(){
        $(".examples").removeClass("hide")
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + $(".inp").val(),
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                "x-rapidapi-key": "9fa988401amsh6852949801643d1p16ab4cjsn16b8fd4074e4"
            }
        }

        $.ajax(settings).done(function (response) {
            // remove the square brackets ([]) from the definition
            let a = response.list[0].definition.split("[")
            let b = a.join("")
            let c = b.split("]")
            let d = c.join("")
            // remove the square brackets ([]) from the example
            let e = response.list[0].example.split("[")
            let f = e.join("")
            let g = f.split("]")
            let h = g.join("")
            // implementing the values
            $(".term").text($(".inp").val())
            $(".meaning").text(d)
            $(".example1").text(h)
        });

    })
})