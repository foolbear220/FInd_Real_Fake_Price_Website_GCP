$(document).ready(function () {
    //Region_SelectChange();
    $("#loader").fadeOut("slow");
    //Fix_Footer();


});

function Page_Click(id) {
    var a_page = document.getElementById("a_page");
    var b_page = document.getElementById("b_page");
    var c_page = document.getElementById("c_page");
    var d_page = document.getElementById("d_page");
    var e_page = document.getElementById("e_page");
    a_page.setAttribute("class", "");
    b_page.setAttribute("class", "");
    c_page.setAttribute("class", "");
    d_page.setAttribute("class", "");
    e_page.setAttribute("class", "");
    var active_page = document.getElementById(id);
    active_page.setAttribute("class", "active");

    //隱藏所有元件
    var element_lock_real_id = document.getElementById("lock_real_id");
    if (element_lock_real_id.innerHTML != "") {
        //alert(element_lock_real_id.innerHTML);
        real_house_click(element_lock_real_id.innerHTML);
    }

    var dates_tr_main = document.querySelectorAll('*[id^="r_"]');
    if (dates_tr_main.length >= 1) {
        for (i = 0; i < dates_tr_main.length; i++) {
            //alert(dates_tr_main[i].id);
            dates_tr_main[i].setAttribute("style", "display:none;");

            var sub_id = dates_tr_main[i].id.replace("r_", "");
            //alert(sub_id);
            var dates_tr_sub = document.querySelectorAll('*[id^="' + sub_id + '"]');
            if (dates_tr_sub.length >= 1) {
                for (j = 0; j < dates_tr_sub.length; j++) {
                    //alert(dates_tr_sub[j].id);
                    dates_tr_sub[j].setAttribute("style", "display:none;");
                }
            }
        }
    }


    //顯示該page的元件
    for (i = (parseInt(active_page.innerHTML)-1)*10; i < parseInt(active_page.innerHTML)*10; i++) {
        var dates = document.querySelectorAll('*[id^="r_' + i + '_"]');
        if (dates.length==1) {
            dates[0].setAttribute("style", "display:table-row;");
        }
    }

    Fix_Footer();
}

function Previous_Page_Function(pages)
{
    var a_page = document.getElementById("a_page");
    var b_page = document.getElementById("b_page");
    var c_page = document.getElementById("c_page");
    var d_page = document.getElementById("d_page");
    var e_page = document.getElementById("e_page");

    if (parseInt(a_page.innerHTML) != 1)
    {
        if ((parseInt(a_page.innerHTML) - 1) >= 1) {
            e_page.innerHTML = (parseInt(a_page.innerHTML) - 1);
            e_page.setAttribute("style", "display:block");
            Page_Click("e_page");
        }
        else {
            e_page.setAttribute("style", "display:none");
        }

        if ((parseInt(a_page.innerHTML) - 2) >= 1) {
            d_page.innerHTML = (parseInt(a_page.innerHTML) - 2);
            d_page.setAttribute("style", "display:block");
        }
        else {
            d_page.setAttribute("style", "display:none");
        }

        if ((parseInt(a_page.innerHTML) - 3) >= 1) {
            c_page.innerHTML = (parseInt(a_page.innerHTML) - 3);
            c_page.setAttribute("style", "display:block");
        }
        else {
            c_page.setAttribute("style", "display:none");
        }


        if ((parseInt(a_page.innerHTML) - 4) >= 1) {
            b_page.innerHTML = (parseInt(a_page.innerHTML) - 4);
            b_page.setAttribute("style", "display:block");
        }
        else {
            b_page.setAttribute("style", "display:none");
        }

        if ((parseInt(a_page.innerHTML) - 5) >= 1) {
            a_page.innerHTML = (parseInt(a_page.innerHTML) - 5);
            a_page.setAttribute("style", "display:block");
        }
        else {
            a_page.setAttribute("style", "display:none");
        }
    }
}

function Next_Page_Function(pages)
{
    var a_page = document.getElementById("a_page");
    var b_page = document.getElementById("b_page");
    var c_page = document.getElementById("c_page");
    var d_page = document.getElementById("d_page");
    var e_page = document.getElementById("e_page");

    if (parseInt(e_page.innerHTML) != pages) {

        if ((parseInt(e_page.innerHTML) + 1) <= pages) {
            a_page.innerHTML = (parseInt(e_page.innerHTML) + 1);
            a_page.setAttribute("style", "display:block");
            Page_Click("a_page");
        }
        else {
            a_page.setAttribute("style", "display:none");
        }

        if ((parseInt(e_page.innerHTML) + 2) <= pages) {
            b_page.innerHTML = (parseInt(e_page.innerHTML) + 2);
            b_page.setAttribute("style", "display:block");
        }
        else {
            b_page.setAttribute("style", "display:none");
        }

        if ((parseInt(e_page.innerHTML) + 3) <= pages) {
            c_page.innerHTML = (parseInt(e_page.innerHTML) + 3);
            c_page.setAttribute("style", "display:block");
        }
        else {
            c_page.setAttribute("style", "display:none");
        }

        if ((parseInt(e_page.innerHTML) + 4) <= pages) {
            d_page.innerHTML = (parseInt(e_page.innerHTML) + 4);
            d_page.setAttribute("style", "display:block");
        }
        else {
            d_page.setAttribute("style", "display:none");
        }

        if ((parseInt(e_page.innerHTML) + 5) <= pages) {
            e_page.innerHTML = (parseInt(e_page.innerHTML) + 5);
            e_page.setAttribute("style", "display:block");
        }
        else {
            e_page.setAttribute("style", "display:none");
        }
    }
}

function Create_Pagination(pages)
{
    var div_center = document.createElement("div");
    div_center.setAttribute("class", "center");
    div_center.setAttribute("id", "center");
    var div_pagination = document.createElement("div");
    div_pagination.setAttribute("class", "pagination");
    //div_pagination.setAttribute("id", "pagination_" + pages)

    var previous_page = document.createElement("a");
    previous_page.innerHTML = "&laquo;"
    previous_page.setAttribute("onclick", "Previous_Page_Function(" + pages+")");
    if (pages > 5) {
        previous_page.setAttribute("style", "display:block");
    }
    else {
        previous_page.setAttribute("style", "display:none");
    }
    var a_page = document.createElement("a");
    a_page.innerHTML = "1";
    a_page.setAttribute("id", "a_page")
    a_page.setAttribute("onclick", "Page_Click(this.id)");
    if (pages >= 1) {
        a_page.setAttribute("style", "display:block");
    }
    else {
        a_page.setAttribute("style", "display:none");
    }
    var b_page = document.createElement("a");
    b_page.innerHTML = "2";
    b_page.setAttribute("id", "b_page");
    b_page.setAttribute("onclick", "Page_Click(this.id)");
    if (pages >= 2) {
        b_page.setAttribute("style", "display:block");
    }
    else {
        b_page.setAttribute("style", "display:none");
    }
    var c_page = document.createElement("a");
    c_page.innerHTML = "3";
    c_page.setAttribute("id", "c_page");
    c_page.setAttribute("onclick", "Page_Click(this.id)");
    if (pages >= 3) {
        c_page.setAttribute("style", "display:block");
    }
    else {
        c_page.setAttribute("style", "display:none");
    }
    var d_page = document.createElement("a");
    d_page.innerHTML = "4";
    d_page.setAttribute("id", "d_page");
    d_page.setAttribute("onclick", "Page_Click(this.id)");
    if (pages >= 4) {
        d_page.setAttribute("style", "display:block");
    }
    else {
        d_page.setAttribute("style", "display:none");
    }
    var e_page = document.createElement("a");
    e_page.innerHTML = "5";
    e_page.setAttribute("id", "e_page");
    e_page.setAttribute("onclick", "Page_Click(this.id)");
    if (pages >= 5) {
        e_page.setAttribute("style", "display:block");
    }
    else {
        e_page.setAttribute("style", "display:none");
    }
    var next_page = document.createElement("a");
    next_page.innerHTML = "&raquo;"
    next_page.setAttribute("onclick", "Next_Page_Function(" + pages+")");
    if (pages > 5) {
        next_page.setAttribute("style", "display:block");
    }
    else {
        next_page.setAttribute("style", "display:none");
    }
    div_pagination.appendChild(previous_page);
    div_pagination.appendChild(a_page);
    div_pagination.appendChild(b_page);
    div_pagination.appendChild(c_page);
    div_pagination.appendChild(d_page);
    div_pagination.appendChild(e_page);
    div_pagination.appendChild(next_page)
    div_center.appendChild(div_pagination);
    $(div_center).insertAfter("#css-table");
 
}


function real_house_click(clicked_id) {
    //alert(clicked_id);
    var element_lock_real_id = document.getElementById("lock_real_id");
    var element_lock_real_position_top = document.getElementById("lock_real_position_top");
    var element_table = document.getElementById(clicked_id);
    //alert(element_table);
    if (clicked_id != element_lock_real_id.innerHTML) {

        if (element_lock_real_id.innerHTML != "") {
            var element = document.getElementById(element_lock_real_id.innerHTML);
            var str = element_lock_real_id.innerHTML.replace("_lock", "");
            element.id = str;
            element_table.firstChild.lastChild.setAttribute("style", "background-color:#5C9ECF;width:auto;color:white");

            //刪除複製的DIV
            $("#copy_element").remove();

            //找到所有跟這個id有關的報價table
            var index_of_r = str.indexOf("r_");
            var str_without_r = str.substring(index_of_r + 2, str.length)
            //alert(str_without_r);
            var dates = document.querySelectorAll('*[id^="' + str_without_r + '_f_"]');
            for (i = 0; i < dates.length; i++) {
                dates[i].setAttribute("style", "display: none; background-color:#FFFFFF");

            }
        }

        element_lock_real_id.innerHTML = clicked_id + "_lock";
        var position = $("#" + clicked_id).offset();
        //var div_top = offset(element_table);
        //console.log(div_top.top);
        //console.log(window.pageYOffset);
        var element_wrap = document.getElementById("wrap");
        var wrap_scrolltop = element_wrap.scrollTop;
        element_lock_real_position_top.innerHTML = position.top + wrap_scrolltop;
        element_table.id = element_lock_real_id.innerHTML;
        element_table.firstChild.lastChild.setAttribute("style", "display:none");

        //複製這一個DIV
        var click_str = "real_house_click(" + element_lock_real_id.innerHTML + ".id)";
        clone = element_table.cloneNode(true); // true means clone all childNodes and all event handlers
        clone.id = "copy_element";
        clone.setAttribute("onclick", click_str);
        clone.setAttribute("style", "display: none ; background-color: #ffff93 ;width: 90%; position: fixed;top: 0px;left:0px;");
        document.getElementById("houseinfo_real").appendChild(clone);

        console.log(wrap_scrolltop);
        console.log(position.top);

        //找到所有跟這個id有關的報價table
        var index_of_r = clicked_id.indexOf("r_");
        var str_without_r = clicked_id.substring(index_of_r + 2, clicked_id.length);
        //alert(str_without_r);
        var dates = document.querySelectorAll('*[id^="' + str_without_r + '_f_"]');
        for (i = 0; i < dates.length; i++) {
            dates[i].setAttribute("style", "display: table-row ; background-color:#DDDDDD");
        }
    }
    else {
        //alert(str);
        var str = element_lock_real_id.innerHTML.replace("_lock", "");
        element_lock_real_id.innerHTML = "";
        element_lock_real_position_top.innerHTML = "0";
        element_table.id = str;
        element_table.firstChild.lastChild.setAttribute("style", "background-color:#5C9ECF;width:auto;color:white");

        //刪除複製的DIV
        $("#copy_element").remove();

        //找到所有跟這個id有關的報價table
        var index_of_r = str.indexOf("r_");
        var str_without_r = str.substring(index_of_r + 2, str.length);
        //alert(str_without_r);
        var dates = document.querySelectorAll('*[id^="' + str_without_r + '_f_"]');
        for (i = 0; i < dates.length; i++) {
            dates[i].setAttribute("style", "display: none; background-color:#FFFFFF");
        }

    }

}


function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

$(window).resize(function () {
    Fix_Footer();
    var window_width = $(window).width();
    var copy_element = document.getElementById("copy_element");
    if (copy_element != undefined) {
        if (window_width > 960) {
            if (copy_element.style.display == "table-row") {
                copy_element.style.display = "none";
                
            }
        }
        else {
            if (copy_element.style.position == "fixed") {

                var element_lock_real_id = document.getElementById("lock_real_id");
                var element_lock_real_position_top = document.getElementById("lock_real_position_top");

                //修正左邊位置跟寬度
                copy_element.style.display = "table-row";
                copy_element.style.width = parseInt($("#css-table").width()) + "px";
                copy_element.style.left = $("#" + element_lock_real_id.innerHTML).left;

                //是否要重新調整標記的位置?2018.12.11 19:20

                var position = $("#" + element_lock_real_id.innerHTML).offset();
                var element_wrap = document.getElementById("wrap");
                var wrap_scrolltop = element_wrap.scrollTop;
                element_lock_real_position_top.innerHTML = position.top + wrap_scrolltop;
            }
        }
    }
});

var wrap = $("#wrap");
wrap.on("scroll", function (e) {
    var wrap = $("#wrap");
    var element_lock_real_position_top = document.getElementById("lock_real_position_top");
    var element_lock_real_id = document.getElementById("lock_real_id");
    var element_table = document.getElementById(element_lock_real_id.innerHTML);
    var window_width = $(window).width();
    console.debug(window_width);
    if (element_lock_real_id.innerHTML != "") {
       
        console.clear();
        if (this.scrollTop > element_lock_real_position_top.innerHTML && window_width<=960) {
            var copy_element = document.getElementById("copy_element");
            copy_element.setAttribute("style", "display: table-row ; background-color: #ffff93 ; position: fixed;top: 0px;");

            var css_table = document.getElementById("css-table");
            copy_element.style.width = parseInt( $("#css-table").width()) + "px";
            copy_element.style.left = element_table.style.left;
        } else {
            var copy_element = document.getElementById("copy_element");
            copy_element.setAttribute("style", "display: none ;");

        }

        console.log(this.scrollTop);
    }
});

function Region_SelectChange() {

    var region_select_index = document.getElementById("regionlist").selectedIndex;
    alert(region_select_index);
    var region_select_list = document.getElementById("regionlist").options;
    var region = region_select_list[region_select_index].innerHTML
    data_tmp = { 'region': region };  // data to send to server.

    //清除舊的sectionlist
    //using the function:
    removeOptions(document.getElementById("sectionlist"));
    
    $.post('/js_region_selectchange', data_tmp, function (data) {
        for (i = 0; i < data.length; i++) {
            var x = document.getElementById("sectionlist");
            var option = document.createElement("option");
            option.text = data[i];
            //alert(data[i]);
            x.add(option);
        }

        Section_SelectChange()

    });
}

function Section_SelectChange() {
    var region_select_index = document.getElementById("regionlist").selectedIndex;
    var region_select_list = document.getElementById("regionlist").options;
    var region = region_select_list[region_select_index].innerHTML

    var section_select_index = document.getElementById("sectionlist").selectedIndex;
    var section_select_list = document.getElementById("sectionlist").options;
    var section = section_select_list[section_select_index].innerHTML
    data_tmp = { 'region': region, 'section': section };  // data to send to server.

    //清除舊的sectionlist
    //using the function:
    removeOptions(document.getElementById("roadlist"));

    $.post('/js_section_selectchange', data_tmp, function (data) {
        for (i = 0; i < data.length; i++) {
            var x = document.getElementById("roadlist");
            var option = document.createElement("option");
            option.text = data[i];
            x.add(option);
        }
    });
}

function removeOptions(selectbox) {
    var i;
    console.log(selectbox.options.length);
    for (i = selectbox.options.length - 1; i >= 0; i--) {
        console.log(i);
        selectbox.remove(i);
    }
    console.log(selectbox.options.length);
}

function Test_Function() {
    var table = document.getElementById("houseinfo_real");
    var tr_div = document.createElement("div");
    tr_div.setAttribute("class", "tr");
    tr_div.setAttribute("id", "t1");
    tr_div.setAttribute("onclick", "real_house_click(this.id)");

    var td_div_createtime = document.createElement("div");
    td_div_createtime.setAttribute("class", "td");
    td_div_createtime.innerHTML = "20181121";
    tr_div.appendChild(td_div_createtime);

    var td_div_region = document.createElement("div");
    td_div_region.setAttribute("class", "td");
    td_div_region.innerHTML = "高雄市";
    tr_div.appendChild(td_div_region);

    table.appendChild(tr_div);
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

function Create_Header() {
    //建立標頭
    var tr_header = document.createElement("div");
    tr_header.setAttribute("class", "tr");
    tr_header.setAttribute("id", "tr_header");
    tr_header.innerHTML = "<div class=\"th\">實價/開價</div>" +
        "<div class=\"th\">建立時間</div>"+
        "<div class=\"th\">縣市</div>"+
        "<div class=\"th\">轄區</div>"+
        "<div class=\"th\">形態</div>"+
        "<div class=\"th\">格局</div>"+
        "<div class=\"th\">樓層</div>"+
        "<div class=\"th\">權狀</div>"+
        "<div class=\"th\">屋齡</div>"+
        "<div class=\"th\">地址</div>"+
        "<div class=\"th\">價格</div>";

    var css_thead = document.getElementById("thead");
    css_thead.appendChild(tr_header);
    //alert(css_table.firstChild);
}


(function ($) {
    $.fn.hasScrollBar = function () {
        return this.get(0).scrollHeight > this.height();
    }
})(jQuery);

function Fix_Footer() {
    $('#enddiv').remove();
    //alert($('#wrap').hasScrollBar());
    if ($('#wrap').hasScrollBar() == true) {
        enddiv = document.createElement('div');
        enddiv.setAttribute('id', 'enddiv');
        enddiv.setAttribute('style', 'position:relative;top:0px;left:0px;background-color:#DCDCDC;height:60px;line-height: 60px;width:100%;text-align:center;vertical-align:middle;');
        enddiv.innerHTML = "Contact us：peoplearekungfumaster@gmail.com";
        var center = document.getElementById("#center");
        //alert($("#center").length);

        if ($("#center").length) {

            $(enddiv).insertAfter(".center");
        }
        else {
            $(enddiv).insertAfter("#css-table");
        }
    }
    else {
        enddiv = document.createElement('div');
        enddiv.setAttribute('id', 'enddiv');
        enddiv.setAttribute('style', 'position:absolute;bottom:0px;left:0px;right:0px;background-color:#DCDCDC;height:60px;line-height: 60px;width:100%;text-align:center;vertical-align:middle;');
        enddiv.innerHTML = "Contact us：peoplearekungfumaster@gmail.com";
        var center = document.getElementById("#center");
        if ($("#center").length) {
            $(enddiv).insertAfter(".center");
        }
        else {
            $(enddiv).insertAfter("#css-table");
        }
    }
    /*$('#footer').remove();
    footer = document.createElement('div');
    footer.setAttribute('id', 'footer');
    footer.setAttribute('style', 'position:relative;width:100%;height:60px;background-color:#DCDCDC;text-align:center;');
    $(footer).insertAfter(".center");*/
}


function Search_Function() {

    var region = $('#regionlist  label button').text();
    if (region == '縣市')
        return alert("縣市未選");
    var section = $('#sectionlist  label button').text();
    if (section == '轄區')
        return alert("轄區未選");
    var road = $('#roadlist  label button').text();
    if (road == '道路')
        return alert("道路未選");
    var type = $('#typelist  label button').text();
    if (type == '型態')
        return alert("型態未選");
    var year = $('#yearlist  label button').text();
    if (year == '年')
        return alert("年未選");
    //忙碌的效果
    $('#loader').fadeIn("slow");
    /*$('#loader').top = $("#css-table").top();
    $('#loader').height = $("#css-table").height();*/
    /*var loader = document.getElementById("loader");
    var css_table = document.getElementById("css-table");
    var offsetHeight = document.getElementById("css-table").offsetHeight;
    alert(offsetHeight);
    alert(css_table.top);
    alert(css_table.height);
    alert(css_table.style.top);
    alert(css_table.style.height);
    alert($("#css-table").top());
    alert($("#css-table").height());*/
    //loader.top = css_table.top;
    //loader.height = css_table.height;

    //初始化顯示結果
    $(".center").remove();
    var element_lock_real_id = document.getElementById("lock_real_id");
    if (element_lock_real_id != null) {
        element_lock_real_id.innerHTML = "";
    }
    var element_lock_real_position_top = document.getElementById("lock_real_position_top");
    if (element_lock_real_position_top != null) {
        element_lock_real_position_top.innerHTML = "0";
    }
    //$("#lock_real_id").innerHTML = "";
    //$("#elementlock_real_position_top").innerHTML = "0";
    $("#copy_element").remove();
    $("#houseinfo_real").empty();
    $("#tr_header").remove();

    //Create_Header();


    /*
    var region_select_index = document.getElementById("regionlist").selectedIndex;
    var region_select_list = document.getElementById("regionlist").options;
    var region = region_select_list[region_select_index].innerHTML;

    var section_select_index = document.getElementById("sectionlist").selectedIndex;
    var section_select_list = document.getElementById("sectionlist").options;
    var section = section_select_list[section_select_index].innerHTML;

    var road_select_index = document.getElementById("roadlist").selectedIndex;
    var road_select_list = document.getElementById("roadlist").options;
    var road = road_select_list[road_select_index].innerHTML;

    var type_select_index = document.getElementById("typelist").selectedIndex;
    var type_select_list = document.getElementById("typelist").options;
    var type = type_select_list[type_select_index].innerHTML;

    var year_select_index = document.getElementById("yearlist").selectedIndex;
    var year_select_list = document.getElementById("yearlist").options;
    var year = year_select_list[year_select_index].innerHTML;*/
    /*
    var region_select_index = document.getElementById("regionlist").selectedIndex;
    var region_select_list = document.getElementById("regionlist").options;
    var region = region_select_list[region_select_index].innerHTML;

    var section_select_index = document.getElementById("sectionlist").selectedIndex;
    var section_select_list = document.getElementById("sectionlist").options;
    var section = section_select_list[section_select_index].innerHTML;

    var road_select_index = document.getElementById("roadlist").selectedIndex;
    var road_select_list = document.getElementById("roadlist").options;
    var road = road_select_list[road_select_index].innerHTML;

    var type_select_index = document.getElementById("typelist").selectedIndex;
    var type_select_list = document.getElementById("typelist").options;
    var type = type_select_list[type_select_index].innerHTML;

    var year_select_index = document.getElementById("yearlist").selectedIndex;
    var year_select_list = document.getElementById("yearlist").options;
    var year = year_select_list[year_select_index].innerHTML;*/
    /*
    data_tmp = {
        'region': region,
        'section': section,
        'road': road,
        'type': type,
        'year': year
    };*/  // data to send to server.

    var sJson_temp = JSON.stringify({
        region: region,
        section: section,
        road: road,
        type: type,
        year: year
    });

    var promises = [];
    $.ajax({
        type: "POST",
        url: "/js_search_real",
        data: sJson_temp,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(
        function (data) {
            if (data != null) {
                if (data.length != 0) {
                    for (i = 0; i < data.length; i++) {
                        var table = document.getElementById("houseinfo_real");
                        var tr_div = document.createElement("div");
                        //tr_div.setAttribute("data-toggle", "collapse");
                        //tr_div.setAttribute("data-target", "." + data[i][0]);
                        tr_div.setAttribute("class", "tr");
                        tr_div.setAttribute("id", "r_" + i + "_" + data[i][0]);
                        tr_div.setAttribute("style", "display:none");
                        //tr_div.setAttribute("onclick", "real_house_click(this.id)");
                        /*
                        var td_div_add_icon = document.createElement("div");
                        td_div_add_icon.setAttribute("class", "td");
                        td_div_add_icon.innerHTML = "TEST";
                        tr_div.appendChild(td_div_add_icon);*/


                        var real_tag = document.createElement("div");
                        real_tag.setAttribute("class", "td");
                        real_tag.setAttribute("style", "background-color:#C76388;width:auto;color:white")
                        real_tag.innerHTML = "實價";

                        var td_div_fake_real = document.createElement("div");
                        td_div_fake_real.setAttribute("class", "td");
                        td_div_fake_real.appendChild(real_tag);
                        //td_div_fake_real.appendChild(real_img);
                        //td_div_fake_real.appendChild(fake_img);
                        //td_div_fake_real.innerHTML = 
                        tr_div.appendChild(td_div_fake_real);

                        var td_div_createtime = document.createElement("div");
                        td_div_createtime.setAttribute("class", "td");
                        td_div_createtime.setAttribute("data-title", "交易日期　　：");
                        td_div_createtime.innerHTML = toDateTime(data[i][6]).toLocaleDateString();
                        tr_div.appendChild(td_div_createtime);

                        var td_div_region = document.createElement("div");
                        td_div_region.setAttribute("class", "td");
                        td_div_region.setAttribute("data-title", "縣市　　　　：");
                        td_div_region.innerHTML = data[i][2];
                        tr_div.appendChild(td_div_region);

                        var td_div_section = document.createElement("div");
                        td_div_section.setAttribute("class", "td");
                        td_div_section.setAttribute("data-title", "轄區　　　　：");
                        td_div_section.innerHTML = data[i][3];
                        tr_div.appendChild(td_div_section);

                        var td_div_type = document.createElement("div");
                        td_div_type.setAttribute("class", "td");
                        td_div_type.setAttribute("data-title", "形態　　　　：");
                        td_div_type.innerHTML = data[i][1];
                        tr_div.appendChild(td_div_type);

                        var td_div_room = document.createElement("div");
                        td_div_room.setAttribute("class", "td");
                        td_div_room.setAttribute("data-title", "格局　　　　：");
                        td_div_room.innerHTML = data[i][4];
                        tr_div.appendChild(td_div_room);

                        var td_div_floor = document.createElement("div");
                        td_div_floor.setAttribute("class", "td");
                        td_div_floor.setAttribute("data-title", "樓層　　　　：");
                        td_div_floor.innerHTML = data[i][5];
                        tr_div.appendChild(td_div_floor);

                        var td_div_area = document.createElement("div");
                        td_div_area.setAttribute("class", "td");
                        td_div_area.setAttribute("data-title", "權狀（坪）　：");
                        td_div_area.innerHTML = ((data[i][13] * 10000) / data[i][14] * 0.3025).toFixed(2);
                        tr_div.appendChild(td_div_area);

                        var td_div_age = document.createElement("div");
                        td_div_age.setAttribute("class", "td");
                        td_div_age.setAttribute("data-title", "屋齡（年）　：");
                        td_div_age.innerHTML = data[i][11];
                        tr_div.appendChild(td_div_age);

                        var td_div_address = document.createElement("div");
                        td_div_address.setAttribute("class", "td");
                        td_div_address.setAttribute("data-title", "地址　　　　：");
                        td_div_address.innerHTML = data[i][8];
                        tr_div.appendChild(td_div_address);

                        var td_div_price = document.createElement("div");
                        td_div_price.setAttribute("class", "td");
                        td_div_price.setAttribute("data-title", "價格（萬元）：");
                        td_div_price.innerHTML = data[i][13];
                        tr_div.appendChild(td_div_price);

                        table.appendChild(tr_div);

                        var sJson = JSON.stringify({
                            region: region,
                            section: section,
                            road: road,
                            type: data[i][1],
                            year: year,
                            room: data[i][4],
                            floor: data[i][5],
                            area: ((data[i][13] * 10000) / data[i][14] * 0.3025).toFixed(2),
                            age: data[i][11],
                            real_id: i + "_" + data[i][0]
                        });


                        var request = $.ajax({
                            type: "POST",
                            url: "/js_search",
                            data: sJson,
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data_fake) {
                                //does something
                                if (data_fake != null) {
                                    if (data_fake.length != 0) {
                                        var tr_table = document.getElementById("r_" + data_fake[0][19]);
                                        tr_table.setAttribute("onclick", "real_house_click(this.id)");
                                        var open_tag = document.createElement("div");
                                        open_tag.setAttribute("class", "td");
                                        open_tag.setAttribute("style", "background-color:#5C9ECF;width:auto;color:white")
                                        open_tag.innerHTML = "開價";
                                        tr_table.firstChild.appendChild(open_tag);

                                        for (i = 0; i < data_fake.length; i++) {
                                            //var table = document.getElementById("houseinfo_real");
                                            var tr_div = document.createElement("div");
                                            //tr_div.setAttribute("class", "tr collapse " + data_fake[i][19]);
                                            tr_div.setAttribute("class", "tr");
                                            tr_div.setAttribute("id", data_fake[i][19] + "_f_" + i);
                                            tr_div.setAttribute("style", "display:none");

                                            var open_tag = document.createElement("div");
                                            open_tag.setAttribute("class", "td");
                                            open_tag.setAttribute("style", "background-color:#5C9ECF;width:auto;color:white")
                                            open_tag.innerHTML = "開價";

                                            var td_div_fake_real = document.createElement("div");
                                            td_div_fake_real.setAttribute("class", "td");
                                            td_div_fake_real.appendChild(open_tag);
                                            tr_div.appendChild(td_div_fake_real);

                                            var td_div_createtime = document.createElement("div");
                                            td_div_createtime.setAttribute("data-title", "建立日期　　：");
                                            td_div_createtime.setAttribute("class", "td");
                                            td_div_createtime.innerHTML = toDateTime(data_fake[i][16]).toLocaleDateString();;
                                            tr_div.appendChild(td_div_createtime);

                                            var td_div_region = document.createElement("div");
                                            td_div_region.setAttribute("class", "td");
                                            td_div_region.setAttribute("data-title", "縣市　　　　：");
                                            td_div_region.innerHTML = data_fake[i][3]
                                            tr_div.appendChild(td_div_region);

                                            var td_div_section = document.createElement("div");
                                            td_div_section.setAttribute("class", "td");
                                            td_div_section.setAttribute("data-title", "轄區　　　　：");
                                            td_div_section.innerHTML = data_fake[i][4];
                                            tr_div.appendChild(td_div_section);

                                            var td_div_type = document.createElement("div");
                                            td_div_type.setAttribute("class", "td");
                                            td_div_type.setAttribute("data-title", "形態　　　　：");
                                            td_div_type.innerHTML = data_fake[i][2];
                                            tr_div.appendChild(td_div_type);

                                            var td_div_room = document.createElement("div");
                                            td_div_room.setAttribute("class", "td");
                                            td_div_room.setAttribute("data-title", "格局　　　　：");
                                            td_div_room.innerHTML = data_fake[i][6];
                                            tr_div.appendChild(td_div_room);

                                            var td_div_floor = document.createElement("div");
                                            td_div_floor.setAttribute("class", "td");
                                            td_div_floor.setAttribute("data-title", "樓層　　　　：");
                                            td_div_floor.innerHTML = data_fake[i][8];
                                            tr_div.appendChild(td_div_floor);

                                            var td_div_area = document.createElement("div");
                                            td_div_area.setAttribute("class", "td");
                                            td_div_area.setAttribute("data-title", "權狀（坪）　：");
                                            td_div_area.innerHTML = data_fake[i][10];
                                            tr_div.appendChild(td_div_area);

                                            var td_div_age = document.createElement("div");
                                            td_div_age.setAttribute("class", "td");
                                            td_div_age.setAttribute("data-title", "屋齡（年）　：");
                                            td_div_age.innerHTML = data_fake[i][11];
                                            tr_div.appendChild(td_div_age);

                                            var td_div_address = document.createElement("div");
                                            td_div_address.setAttribute("class", "td");
                                            td_div_address.setAttribute("data-title", "地址　　　　：");
                                            td_div_address.innerHTML = data_fake[i][12];
                                            tr_div.appendChild(td_div_address);

                                            var td_div_price = document.createElement("div");
                                            td_div_price.setAttribute("class", "td");
                                            td_div_price.setAttribute("data-title", "價格（萬元）：");
                                            td_div_price.innerHTML = data_fake[i][14];
                                            tr_div.appendChild(td_div_price);

                                            $(tr_div).insertAfter("#" + "r_" + data_fake[i][19]);

                                        }
                                        //alert("Finish");
                                    }
                                    else {

                                    }
                                }

                            }
                        });

                        promises.push(request);
                    }
                }
            }


            //Pagination
            if (data != null) {
                if (data.length != 0) {
                    var pages = Math.ceil(data.length / 10);
                    Create_Pagination(pages);
                    //alert("T")
                    Page_Click("a_page");



                    /*var footer = document.createElement('div');
                    footer.setAttribute('id', 'footer');
                    footer.setAttribute('class', 'footer');
                    $(footer).insertAfter(".center");*/
                }
            }




            $.when.apply(null, promises).done(function () {
                $('#loader').fadeOut("slow");
            })
        }
    );
};


//----Sector ----//
$('#regionlist').on('click', function () {
    $(this).toggleClass('active')
})

$('#regionlist ul li').on('click', function () {
    var v = $(this).text();
    $('#regionlist ul li').not($(this)).removeClass('active');
    $(this).addClass('active');
    $('#regionlist label button').text(v)
    //--更新Section--//
    data_tmp = { 'region': v };  // data to send to server.

    //清除舊的sectionlist
    $('#ul-id1').empty();
    //清除舊的roadlist
    $('#ul-id2').empty();
    $('#sectionlist label button').text("轄區");
    $('#roadlist label button').text("道路");   

    $.post('/js_region_selectchange', data_tmp, function (data) {
        for (i = 0; i < data.length; i++) {
            var x = document.getElementById("ul-id1");
            //<li role="option" class="ng-binding ng-scope" tabindex="-1" aria-selected="false">新北市</li>
            var option = document.createElement("li");
            option.setAttribute("role", "option");
            option.setAttribute("class", "sectionlist_class");
            option.setAttribute("tabindex", "-1");
            option.setAttribute("aria-selected", "false");
            option.innerHTML = data[i];
            //alert(data[i]);
            x.appendChild(option);
        }
        

    });


})


$('#sectionlist').on('click', function () {
    $(this).toggleClass('active')
})

$('#sectionlist').on('click','.sectionlist_class', function () {
    var v = $(this).text();
    $('#sectionlist ul li').not($(this)).removeClass('active');
    $(this).addClass('active');
    $('#sectionlist label button').text(v)

    var region_text = $('#regionlist label').text();
    data_tmp = { 'region': region_text, 'section': v };  // data to send to server.

    //清除舊的roadlist
    $('#ul-id2').empty();
    $('#roadlist label button').text("道路"); 

    $.post('/js_section_selectchange', data_tmp, function (data) {
        for (i = 0; i < data.length; i++) {
            var x = document.getElementById("ul-id2");
            var option = document.createElement("li");
            option.setAttribute("role", "option");
            option.setAttribute("class", "roadlist_class");
            option.setAttribute("tabindex", "-1");
            option.setAttribute("aria-selected", "false");
            option.innerHTML = data[i];
            //alert(data[i]);
            x.appendChild(option);
        }
    });
})

$('#roadlist').on('click', function () {
    $(this).toggleClass('active')
})

$('#roadlist').on('click', '.roadlist_class', function () {
    var v = $(this).text();
    $('#roadlist ul li').not($(this)).removeClass('active');
    $(this).addClass('active');
    $('#roadlist label button').text(v)
})

$('#yearlist').on('click', function () {
    $(this).toggleClass('active')
})

$('#yearlist  ul li').on('click', function () {
    var v = $(this).text();

    $('#yearlist ul li').not($(this)).removeClass('active');
    $(this).addClass('active');
    $('#yearlist label button').text(v)
})

$('#typelist').on('click', function () {
    $(this).toggleClass('active')
})

$('#typelist   ul li').on('click', function () {
    var v = $(this).text();
    $('#typelist ul li').not($(this)).removeClass('active');
    $(this).addClass('active');
    $('#typelist label button').text(v)
})
//----Sector ----//

//----修正開價號-----//
function FixAddress(address) {
    var address_new = address;
    if (address[address.length - 1] == "號" || address[address.length - 1] == "号") {
        var not_number_index = 0;
        /*for (i = address.length - 2; i > 0; i --) {
            if (isNaN(address[i]) == true) {
                //找到下一個中文字
                not_number_index = i;
            }
        }*/
        //alert(not_number_index);
        //產生新的無號之地址
        address_new = address.substring(0, 5);
        
    }
    else {
        //如果最後一個為數字
        /*if (isNaN(address[address.length - 1]) == false)
        {
            var not_number_index = 0;
            for (i = address.length - 2; i >= 0; i--) {
                if (isNaN(address[i]) == true) {
                    //找到下一個中文字
                    not_number_index = i;
                    break;
                }
            }
            //產生新的無號之地址
            address_new = address.substring(0, not_number_index - 1);
        }*/
    }
    return address_new;
}