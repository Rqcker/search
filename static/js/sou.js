/*
Author: D. Young
Homepage: https://yyv.me/
github: https://github.com/5iux/sou
Date: 2019-07-26
All rights reserved, please do not delete
❶❷❸❹❺❻❼❽❾❿
Modified by yeetime
github: https://github.com/yeetime/sou2
Date: 2019-12-13
Modified by Junhao
https://junhaosong.com
https://github.com/rqcker
1st.May.2021
*/

$(document).ready(function() {

    //Search engine list [preset]
    var se_list_preinstall = {
        '1':{
            id      :1,
            title   :"Google",
            url     :"https://www.google.com/search",
            name    :"q",
            img     :"./static/icon/google_1.png",

        },
        '2':{
            id      :2,
            title   :"Baidu",
            url     :"https://www.baidu.com/s",
            name    :"wd",
            img     :"./static/icon/baidu.ico",
        },
        '3':{
            id      :3,
            title   :"Bing",
            url     :"https://cn.bing.com/search",
            name    :"q",
            img     :"./static/icon/bing.ico",
        },
    };

    //Home page shortcut[default]
    var quick_list_preinstall = {
        '1':{
            title   :"Blog",
            url     :"https://junhaosong.com",
            img     :"https://junhaosong.com/static/images/avatar-300x300.webp",
            explain :"Junhao's Blog",
        },
    };

    //Search box data loading
    searchData();

    //Shortcut data loading
    quickData();

    //Judge the size of the window, add the input box automatically
    var wid = $("body").width();
    if (wid < 640) {
        $(".wd").attr('autocomplete', 'off');
    }else{
        $(".wd").focus();
    }

    //Set content loading
    setSeInit();//Search engine settings
    setQuickInit();//Shortcut settings


    //Get a list of search engines
    function getSeList() {
        var se_list_local = Cookies.get('se_list');
        if (se_list_local !== "{}"&&se_list_local) {
            return JSON.parse(se_list_local);
        } else {
            setSeList (se_list_preinstall);
            return se_list_preinstall;
        }
    }

    //Set search engine list
    function setSeList (se_list) {
        if(se_list){
           Cookies.set('se_list', se_list, { expires: 36500 });
           return true;
        }
        return false;
    }

    //Select search engine click event
    $(document).on('click',function(e){
        if($(".search-engine").is(":hidden") && $(".se").is(e.target)){
            if ($(".se").is(e.target)) {
                seList();
                $(".search-engine").show();
            }
        }else{
            if (!$(".search-engine").is(e.target) && $(".search-engine").has(e.target).length === 0) {
                $(".search-engine").hide();
            }
        }
    });

    //Search engine list click
    $(".search-engine-list").on("click",".se-li",function(){
        var url = $(this).attr('url');
        var name = $(this).attr('name');
        var img = $(this).attr('img');
        $(".search").attr("action",url);
        $(".wd").attr("name",name);
        $(".se").attr("src",img);
        $(".search-engine").hide();
    });

    //Menu click
    $("#menu").click(function(event) {
        $(this).toggleClass('on');
        $(".side").toggleClass('closed');
    });
    $("#content").click(function(event) {
        $(".on").removeClass('on');
        $(".side").addClass('closed');
    });

    // Sidebar tab card switching
    $(".side").rTabs({
        bind: 'click',
        animation: 'left'
    });

    //Modify the default search engine
    $(".se_list_table").on("click",".set_se_default",function(){
        var name = $(this).val();
        Cookies.set('se_default', name, { expires: 36500 });
        setSeInit();
    });

    //Get the default search engine
    function getSeDefault(){
        var se_default = Cookies.get('se_default');
        return se_default?se_default:1;
    }

    //Search box data loading
    function searchData() {
        var se_default =getSeDefault();
        var se_list = getSeList();
        var defaultSe = se_list[se_default];
        if (defaultSe){
            $(".search").attr("action", defaultSe["url"]);
            $(".se").attr("src", defaultSe["img"]);
            $(".wd").attr("name", defaultSe["name"]);
        }

    }

    //Search engine list loading
    function seList() {
        var html = "";
        var se_list = getSeList();
        for(var i in se_list){
            html+="<li style='float: left; width: 80px!important; height: 30px!important; line-height: 30px; text-align: left; font-size: 14px; left: 15px; padding: 5px 10px 5px 10px; margin: 0 10px 10px 0; cursor: pointer; list-style: none; position: relative; border-radius: 10px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;' class='se-li' url='"+se_list[i]["url"]+"' name='"+se_list[i]["name"]+"' img='"+se_list[i]["img"]+"'><img src='"+se_list[i]["img"]+"'></img>"+se_list[i]["title"]+"</li>";
        }
        $(".search-engine-list").html(html);
    }

    //Settings-search engine list loading
    function setSeInit () {
        var se_default = getSeDefault();
        var se_list  = getSeList();
        var html = "";
        for(var i in se_list){
            var tr = "<tr><td></td>";
            if(i == se_default){
                tr ="<tr><td><span class='iconfont iconhome'></span></td>";
            }
            tr += "<td>"+i+". "+ se_list[i]["title"] +"</td><td><button class='set_se_default' value='"+i+"'><span class='iconfont iconstrore-add'></span></button><button class='edit_se' value='"+i+"'><span class='iconfont iconbook-edit'></span></button> <button class='delete_se' value='"+i+"'><span class='iconfont icondelete'></span></button></td></tr>";
            html+=tr;
        }
        $(".se_list_table").html(html);
    }

    //Search engine added
    $(".set_se_list_add").click(function () {
        $(".se_add_content input").val("");
        $(".se_add_content").show();
    });

    //Search engine save
    $(".se_add_save").click(function () {
        var key_inhere = $(".se_add_content input[name='key_inhere']").val();
        var key = $(".se_add_content input[name='key']").val();
        var title = $(".se_add_content input[name='title']").val();
        var url = $(".se_add_content input[name='url']").val();
        var name = $(".se_add_content input[name='name']").val();
        var img = $(".se_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)){
            alert("Sequence "+key+" is invalid!");
            return;
        }

        var se_list = getSeList();

        if (se_list[key]) {
            alert("Sequence "+key+" has been taken!");
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete se_list[key_inhere];
        }

        se_list[key] = {
            title: title,
            url: url,
            name: name,
            img: img,
        };
        setSeList(se_list);
        setSeInit();
        $(".se_add_content").hide();

    });

    //Close form
    $(".se_add_cancel").click(function () {
        $(".se_add_content").hide();
    });

    //Search engine modification
    $(".se_list").on("click",".edit_se",function(){

        var se_list = getSeList();
        var key = $(this).val();
        $(".se_add_content input[name='key_inhere']").val(key);
        $(".se_add_content input[name='key']").val(key);
        $(".se_add_content input[name='title']").val(se_list[key]["title"]);
        $(".se_add_content input[name='url']").val(se_list[key]["url"]);
        $(".se_add_content input[name='name']").val(se_list[key]["name"]);
        $(".se_add_content input[name='img']").val(se_list[key]["img"]);

        $(".se_add_content").show();
    });

    //Search engine removal
    $(".se_list").on("click",".delete_se",function(){
        var se_default = getSeDefault();
        var key = $(this).val();
        if (key==se_default){
            alert("Cannot delete default search engine!");
        } else {
            var r = confirm("Delete sequence "+key+" ?");
            if (r) {
                var se_list = getSeList();
                delete se_list[key];
                setSeList(se_list);
                setSeInit();
            }
        }
    });

    //Restore default search engine
    $(".set_se_list_preinstall").click(function () {
         var r=confirm("Current settings will be removed! (You'd better backup before performing this)");
         if (r) {
             setSeList (se_list_preinstall);
             Cookies.set('se_default', 1, { expires: 36500 });
             setSeInit();
         }
    });

    //Get a list of shortcuts
    function getQuickList() {
        var quick_list_local = Cookies.get('quick_list');
        if (quick_list_local !== "{}" && quick_list_local) {
            return JSON.parse(quick_list_local);
        } else {
            setQuickList(quick_list_preinstall);
            return quick_list_preinstall;
        }
    }

    //Set shortcut list
    function setQuickList(quick_list) {
        if(quick_list){
           Cookies.set('quick_list', quick_list, {expires: 36500});
           return true;
        }
        return false;
    }

    //Shortcut data loading
    function quickData() {
        var html = "";
        var quick_list = getQuickList();
        for (var i in quick_list) {
            html += "<li class='quick' target='_blank' title='"+quick_list[i]['explain']+"'>\
                        <a class='quick_div_a' target=_blank href='"+quick_list[i]['url']+"'>\
                            <i style='background-image: url("+quick_list[i]['img']+");'></i><div id='txtq'>\
                            "+quick_list[i]['title']+"\</div>\
                        </a>\
                     </li>";
        }
        $(".quick-ul").html(html);
    }

    //Settings-shortcut loading
    function setQuickInit () {

        var quick_list  = getQuickList();
        var html = "";
        for(var i in quick_list){
            tr ="<tr>\
                    <td>"+i+".&nbsp;</td>\
                    <td>"+quick_list[i]['title']+"</td>\
                    <td>\
                        <button class='edit_quick' value='"+i+"'><span class='iconfont iconbook-edit'></span></button>\
                        &nbsp;\
                        <button class='delete_quick' value='"+i+"'><span class='iconfont icondelete'></span></button>\
                    </td>\
                </tr>";
            html+=tr;
        }
        $(".quick_list_table").html(html);
    }

    $(".set_quick_list_add").click(function () {
        $(".quick_add_content input").val("");
        $(".quick_add_content").show();
    });

    $(".quick_add_save").click(function () {
        var key_inhere = $(".quick_add_content input[name='key_inhere']").val();
        var key = $(".quick_add_content input[name='key']").val();
        var title = $(".quick_add_content input[name='title']").val();
        var url = $(".quick_add_content input[name='url']").val();
        var img = $(".quick_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)){
            alert("Sequence "+key+" is invalid!");
            return;
        }

        var quick_list = getQuickList();

        if (quick_list[key]) {
            alert("Sequence "+key+" has been taken!");
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete quick_list[key_inhere];
        }

        quick_list[key] = {
            title: title,
            url: url,
            img: img,
        };
        setQuickList(quick_list);
        setQuickInit();
        $(".quick_add_content").hide();
    });

    $(".quick_add_cancel").click(function () {
        $(".quick_add_content").hide();
    });

    $(".set_quick_list_preinstall").click(function () {
         var r=confirm("Current settings will be removed! (You'd better backup before performing this)");
         if (r) {
             setQuickList (quick_list_preinstall);
             setQuickInit();
         }
    });

    $(".quick_list").on("click",".edit_quick",function(){

        var quick_list = getQuickList();
        var key = $(this).val();
        $(".quick_add_content input[name='key_inhere']").val(key);
        $(".quick_add_content input[name='key']").val(key);
        $(".quick_add_content input[name='title']").val(quick_list[key]["title"]);
        $(".quick_add_content input[name='url']").val(quick_list[key]["url"]);
        $(".quick_add_content input[name='img']").val(quick_list[key]["img"]);

        $(".quick_add_content").show();
    });

    $(".quick_list").on("click",".delete_quick",function(){

        var key = $(this).val();

        var r = confirm("Delete sequence "+key+" ?");
        if (r) {
            var quick_list = getQuickList();
            delete quick_list[key];
            setQuickList(quick_list);
            setQuickInit();
        }
    });

    $("#my_data_out").click(function () {
        var se = getSeList();
        var se_default = getSeDefault();
        var quick = getQuickList();

        var mydata = {"se":se,"se_default":se_default,"quick":quick};
        var json = JSON.stringify(mydata);
        $("#data_txt").val(json);
    });

    $("#my_data_in").click(function () {
        var json = $("#data_txt").val();

        //json
        try {
            var mydata = JSON.parse(json);
        } catch (e) {
            alert("Invalid backup!");
            black;
        }
        if (typeof mydata != 'object') {
            alert("Invalid format!");
            black;
        }

        if(confirm("Current settings will be erased, continue?")){
            setSeList(mydata["se"]);
            if (mydata["se_default"]) {
                Cookies.set('se_default', mydata["se_default"], {expires: 36500});
            }
            setQuickList(mydata["quick"]);

            searchData();
            quickData();
            setSeInit();
            setQuickInit();

            alert("Success!");
        }

    });
});
