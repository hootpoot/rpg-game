$(document).ready(function () {

            //Global variables
            var yourFighter = "";
            var yourStats = "";
            var defenderStats = "";
            var enemies = [];
            var defender = "";
            var mode = "selectFighter";
            var fighters = [$("#jerry"), $("#elaine"), $("#george"), $("#kramer")];
            var stats = [];
            var numDead = 0;
            //fighterstats
            var jerryStats = {
                name: "Jerry",
                hp: 160,
                ap: 20,
                cap: 20
            };
            var elaineStats = {
                name: "Elaine",
                hp: 140,
                ap: 15,
                cap: 15
            };
            var georgeStats = {
                name: "George",
                hp: 120,
                ap: 10,
                cap: 10
            };
            var kramerStats = {
                name: "Kramer",
                hp: 180,
                ap: 25,
                cap: 25
            };
            stats.push(jerryStats, elaineStats, georgeStats, kramerStats);

            $("#jerryHP").text(jerryStats.hp);
            $("#elaineHP").text(elaineStats.hp);
            $("#georgeHP").text(georgeStats.hp);
            $("#kramerHP").text(kramerStats.hp);



            $(".fighter").on("click", function () {
                //select fighter
                if (mode === "selectFighter") {
                    $(this).appendTo("#your-fighter");
                    mode = "selectDefender";
                    yourFighter = this.id;
                    yourStats = stats[this.value];
                    $(this).css("background-color", "PaleGreen");
                    //make all other fighters enemies
                    for (var i = 0; i < fighters.length; i++) {
                        if (fighters[i].attr('id') !== yourFighter) {
                            $(fighters[i]).appendTo($("#your-enemies"));
                            $(fighters[i]).css("background-color", "LightCoral");

                        }
                    }
                    //select defender
                } else if (mode === "selectDefender") {
                    if (yourFighter !== this.id) {
                        $(this).appendTo("#your-defender");
                        $(this).css("background-color", "lightslategrey");
                        //gfdgkdsg
                        $("#play-text").text(" ");
                        $("#play-text2").text(" ");
                        defenderStats = stats[this.value];
                        mode = "attack";
                    }
                }
                //attack mode






            })

            $(".attack").on("click", function () {

                if (mode === "attack") {
                    defenderStats.hp -= yourStats.cap;
                    yourStats.hp -= defenderStats.cap;
                    yourStats.cap += yourStats.ap;
                    update();

                    $("#play-text").text("You attacked " + defenderStats.name + " for " + (yourStats
                            .cap - yourStats.ap) +
                        " damage. ");
                    $("#play-text2").text(defenderStats.name + " attacked you for " + defenderStats.cap +
                        " damage.");

                        //winning conditions
                    if (defenderStats.hp <= 0) {
                        numDead++;

                        $("#your-defender").empty();
                        $("#play-text").text("You defeated " + defenderStats.name);
                        $("#play-text2").text(" ");
                        mode = "selectDefender";
                        if (numDead === 3) {

                            $(".restart").css("visibility", "visible");
                            $("#play-text").text("You defeated all your enemies!");
                            $("#play-text2").text("Click to restart");

                        };
                        //losing conditions
                    } else if (yourStats.hp <= 0) {
                        $("#your-fighter").empty();
                        $("#play-text").text("You were defeated by " + defenderStats.name);
                        $("#play-text2").text("Click to restart");
                        $(".restart").css("visibility", "visible");
                    }
                }




            });
            //restart game
            $(".restart").on("click", function () {
                location.reload();

            });

            //updates hp stats
            function update() {
                $("#jerryHP").text(jerryStats.hp);
                $("#elaineHP").text(elaineStats.hp);
                $("#georgeHP").text(georgeStats.hp);
                $("#kramerHP").text(kramerStats.hp);
            };


        });