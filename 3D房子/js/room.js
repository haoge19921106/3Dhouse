window.onload=function(){
    var scene=document.querySelector(".scene")[0];
    var room=document.getElementsByClassName("room")[0];
    var clientH=document.documentElement.clientHeight;
    var clientW=document.documentElement.clientWidth;
    room.style.transformOrigin="center center "+(clientW/2)+"px";
    var lastPanel=document.querySelector(".panel:last-child");
    lastPanel.style.transform="translate3d(0,0,"+clientW+"px)";
    var floor=document.getElementsByClassName("panel")[0];
    var ceil=document.getElementsByClassName("panel")[4];
    ceil.style.top=-(clientW-clientH)+"px";
    floor.style.width=floor.style.height=ceil.style.height=ceil.style.width=clientW+"px";
    room.style.transform="translateZ(-500px) rotateY(180deg) ";
    lastPanel.onclick=function(){
        room.style.transition="transform 2s ease";
        room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,0deg)"
    }
    var angel1=0;
    var angel=0;
    var flag1=false;
    document.onmousedown=function(e){
        var startx=e.clientX;
        var starty=e.clientY;
        document.onmousemove=function(e){
            flag1=true;
            room.style.transition="none";
            var movex=e.clientX;
            var movey=e.clientY;
            e.preventDefault();
            angel=Math.abs(movex-startx)>Math.abs(movey-starty)?movex-startx:movey-starty;
            room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,"+(angel1+angel)+"deg)"
        }
        document.onmouseup=function(){
            if(flag1){
                angel1+=angel;
            }
            flag1=false;
            document.onmousemove=null;
            document.onmouseup=null;
        }
        e.preventDefault();
    }
    var panels=document.querySelectorAll(".panel");
    var flag=true;
    for(var i=0;i<panels.length;i++){
        if(i<panels.length-1){
            panels[i].ondblclick=function(){
                room.style.transition="transform 2s ease";
                if(flag){
                    room.style.transform="translate3d(0,0,200px) rotate3d(0,1,0,"+(angel1)+"deg)";
                    flag=false;
                }
                else{
                    room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,"+(angel1)+"deg)";
                    flag=true;
                }
            }

        }
    }
}