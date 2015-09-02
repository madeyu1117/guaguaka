window.onload=function(){
    waterfull("main","box");
    //判断是否加载图片
    window.onscroll=function(){
        //模拟后台数据
        var ImgIn={"date":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"}]}
        if(checkpic()){
            for(var i=0;i<ImgIn.date.length;i++){
                var oparent=document.getElementById("main");
                //创建相同结构的盒子放加载进来的图片
                var obox=document.createElement("div");
                var opic=document.createElement("div");
                var oimg=document.createElement("img");
                var ps=document.createElement("p");
                var spans=document.createElement("span");
                var as=document.createElement("a");
                oparent.appendChild(obox);
                obox.appendChild(opic);
                opic.appendChild(oimg);
                opic.appendChild(ps);
                ps.appendChild(spans);
                ps.appendChild(as);
                obox.className="box";
                opic.className="pic";
                oimg.src="images/"+ImgIn.date[i].src;
                spans.innerHTML="5张";
                as.innerHTML="经典美图";
            }
            waterfull("main","box");
        }
    }
}
function waterfull(parent,box){
    var oparent=document.getElementById(parent);
    //获取main中所有class为box的元素
    var all_box=getclass_all(oparent,box);
    //设置图片的固定列数
    var oboxW=all_box[0].offsetWidth;//每个box的宽度
    var oboxS=Math.floor(document.documentElement.clientWidth/oboxW);//求出浏览器中每行的列数
    oparent.style.cssText="width:"+oboxW*oboxS+"px;margin:0 auto";//设置main盒子的宽、高，并且在浏览器中居中
    var harr=[];//存高的数组
    for(var i=0;i<all_box.length;i++){
        if(i<oboxS){
            harr.push(all_box[i].offsetHeight)
        }else{
            var minh=Math.min.apply(null,harr);
            //console.log(minh)
            //获取最小高度的盒子的索引值
            var index=getminhIndex(harr,minh);
            all_box[i].style.position="absolute";
            all_box[i].style.top=minh+"px";
            //all_box[i].style.left=oboxW*index+"px";
            all_box[i].style.left=all_box[index].offsetLeft+"px";
            //修改数组所存的高
            harr[index]+=all_box[i].offsetHeight;
        }
    }
}
//获取main中所有class为box的元素的函数
function getclass_all(oparent,box){
    var box_arr=[];
    var odiv=oparent.getElementsByTagName("*");
    for(var i=0;i<odiv.length;i++){
        if(odiv[i].className==box){
            box_arr.push(odiv[i])
        }
    }
    return box_arr;
}
//获取最小高度的盒子的索引值的函数
function getminhIndex(arr,minh){
    for(i in arr){
        if(arr[i]==minh){
            return i;
        }
    }
}
//判断是否达到加载图片的要求
function checkpic(){
    var oparent=document.getElementById("main");
    var oboxs=getclass_all(oparent,"box");
    var lastbox=oboxs[oboxs.length-1];
    var lastboxH=lastbox.offsetTop+Math.floor(lastbox.offsetHeight/2);
    //获取滚动条滚动的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //获取浏览器窗口的高
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    //console.log(scrollTop);
    return (lastboxH<scrollTop+height)?true:false;
}