import pymysql
import json
import csv
import os

def connect_database():
    try:
        global db 
        global cursor
        #db = pymysql.connect("35.221.243.240","root","Wen_78220","price")
        db = pymysql.connect(unix_socket='/cloudsql/studied-brace-219309:asia-east1:price',user='root',password='Wen_78220',db='price')
        cursor = db.cursor()
        print("Access Success")
    except:
        print("Access Denied")

def search_database_real(region,section,road,shape,year):
    name_to_region_real ={'基隆市':'keelung_real','台北市':'taipei_real','新北市':'newtaipei_real','桃園市':'taoyuan_real',
                '新竹市':'hsinchu_real','苗栗縣':'miaoli_real','台中市':'taichung_real','南投縣':'nantou_real',
                '彰化縣':'changhua_real','嘉義縣':'chiayi_real','雲林縣':'yunlin_real','台南市':'tainan_real',
                '高雄市':'kaohsiung_real','屏東縣':'pingtung_real','台東縣':'taitung_real','花蓮縣':'hualien_real',
                '宜蘭縣':'yilan_real','澎湖縣':'penghu_real','金門縣':'kinmen_real','連江縣':'lienchiang_real',
                '新竹縣':'hsinchucounty_real','嘉義市':'chiayicity_real'}
    year_max = ""
    year_min = ""
    if year=="2018":
        year_max = 1546300799
        year_min = 1514764800
    if year=="2017":
        year_max = 1514764799
        year_min = 1483228800
    if year=="2016":
        year_max = 1483228799
        year_min = 1451606400
    if year=="2015":
        year_max = 1451606399
        year_min = 1420070400
    if year=="2014":
        year_max = 1420070399
        year_min = 1388534400
    if year=="2013":
        year_max = 1388534399
        year_min = 1356998400
    if year=="2012":
        year_max = 1356998399
        year_min = 1325376000
    if shape=="電梯大樓":
        shape_type = "(shape_name LIKE '%大樓%' OR shape_name LIKE '%店面%' OR shape_name LIKE '%華廈%' OR shape_name LIKE '%套房%')"
    if shape=="公寓":
        shape_type = "shape_name LIKE '%公寓%'"
    if shape=="透天/別墅":
        shape_type = "(shape_name LIKE '%透天厝%' OR shape_name LIKE '%店面%')"

    road_ansi = road_index(region,section,road)
    road_ansi = road_ansi.replace("?","_")

    road_buf = "(address LIKE '%" + road_ansi + "%')";
    #sql = "SELECT * FROM `"+name_to_region_real[region]+"` WHERE " + shape_type + " AND section_name LIKE %s AND address LIKE %s AND createtime>%s AND createtime<%s "
    sql = " SELECT * FROM `"+name_to_region_real[region]+"` WHERE "+ shape_type +" AND section_name LIKE '"+section+"' AND "+road_buf+" AND createtime>"+str(year_min)+" AND createtime<"+str(year_max)+" ORDER BY createtime DESC"
    try:
        result = cursor.execute(sql)
        #result = cursor.execute(sql,(str(section),str(road_buf),year_min,year_max));
        db.commit()
        results_list = cursor.fetchall()
        return results_list
    except:
        db.rollback()

def test():
    print("h")

def search_database(region,section,road,shape,year,room,floor,area,age,real_id):
    try:
        name_to_region ={'基隆市':'keelung','台北市':'taipei','新北市':'newtaipei','桃園市':'taoyuan',
                         '新竹市':'hsinchu','苗栗縣':'miaoli','台中市':'taichung','南投縣':'nantou',
                         '彰化縣':'changhua','嘉義縣':'chiayi','雲林縣':'yunlin','台南市':'tainan',
                         '高雄市':'kaohsiung','屏東縣':'pingtung','台東縣':'taitung','花蓮縣':'hualien',
                         '宜蘭縣':'yilan','澎湖縣':'penghu','金門縣':'kinmen','連江縣':'lienchiang',
                         '新竹縣':'hsinchucounty','嘉義市':'chiayicity'}

        year_max = ""
        year_min = ""
        if year=="2018":
            year_max = 1546300799
            year_min = 1483228800
        if year=="2017":
            year_max = 1514764799
            year_min = 1451606400
        if year=="2016":
            year_max = 1483228799
            year_min = 1420070400
        if year=="2015":
            year_max = 1451606399
            year_min = 1388534400
        if year=="2014":
            year_max = 1420070399
            year_min = 1356998400
        if year=="2013":
            year_max = 1388534399
            year_min = 1325376000
        if year=="2012":
            year_max = 1356998399
            year_min = 1293840000

        if shape=="店面（店舖)" or shape=="辦公商業大樓" or shape=="住宅大樓(11層含以上有電梯)" or shape=="華廈(10層含以下有電梯)" or shape=="套房(1房(1廳)1衛)":
            shape_type = "shape_name LIKE '電梯大樓'"
        if shape=="公寓(5樓含以下無電梯)":
            shape_type = "shape_name LIKE '公寓'"
        if shape=="店面（店舖)" or shape=="透天厝":
            shape_type = "(shape_name LIKE '透天厝' OR shape_name LIKE '別墅')"


        age_buf = " AND (houseage <= "+ str(int(age)+1) + " AND houseage >= " + str(int(age)-1) + ")" 
        section_buf = " AND section_name LIKE '" + section + "'"
        road_ansi = road_index(region,section,road)
        road_ansi = road_ansi.replace("?","_")
        address_buf = " AND address LIKE " + "'%" + road_ansi + "%'"
        createtime_buf = " AND (createtime>"+str(year_min)+" AND createtime<"+str(year_max)+") "
        room_buf = " AND room LIKE '" + room +"' "
        
        chinese_dict_to_10 = {'十':10,'二':20,'三':30,'四':40,'五':50,'六':60,'七':70,'八':80,'九':90}
        chinese_dict_to_1 = {'一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'8':9,'九':10}
        floor_buf =""
        floor_top_int = 0
        floor_list = floor.split('/')
        

        if len(floor_list)>=2:
            floor_top_string = floor_list[1].replace("層","")
            if len(floor_top_string)==3:
                floor_top_int = chinese_dict_to_10[floor_top_string[0]]+chinese_dict_to_1[floor_top_string[2]]
                floor_buf = " AND ( floor LIKE '%/" +  str(floor_top_int) + "%' OR floor LIKE '%/" + str(floor_top_int-1) + "%' OR floor LIKE '%/" + str(floor_top_int+1) + "%' )"
            elif len(floor_top_string)==2:
                floor_top_int = chinese_dict_to_10[floor_top_string[0]]+chinese_dict_to_1[floor_top_string[1]]
                floor_buf = " AND ( floor LIKE '%/" +  str(floor_top_int) + "%' OR floor LIKE '%/" + str(floor_top_int-1) + "%' OR floor LIKE '%/" + str(floor_top_int+1) + "%' )"
            elif len(floor_top_string)==1:
                floor_top_int = chinese_dict_to_1[floor_top_string[0]]
                floor_buf = " AND ( floor LIKE '%/" +  str(floor_top_int) + "%' OR floor LIKE '%/" + str(floor_top_int-1) + "%' OR floor LIKE '%/" + str(floor_top_int+1) + "%' )"
            else:
                floor_buf =" "
        else:
            floor_buf =" "
        
        
        #area_buf ="area LIKE '"+ + "' "
        #floor_buf =
        sql = "SELECT * FROM `"+name_to_region[region]+"` WHERE " + shape_type + section_buf+address_buf+createtime_buf + room_buf + floor_buf+ age_buf + " ORDER BY createtime ASC"
        result = cursor.execute(sql);
        db.commit()
        results_list = cursor.fetchall()
        results_list_add_real_id =()
        for result in results_list:
            result = result +(real_id,)
            result_lst = list(result)
            result_lst[12] = FixAddress(result_lst[12])
            result = tuple(result_lst)
            results_list_add_real_id = results_list_add_real_id+ (result,)
        return results_list_add_real_id
    except:
        db.rollback()

def FixAddress(address):
    address_new = address
    if address[len(address)-1].isdigit()==True:
        for k in range(len(address)-2,0,-1):
            if address[k].isdigit()==False:
                address_new = address[:k+1]
                break
        

    for i in range(len(address_new)-1,0,-1):
        if address_new[i]=='號' or address_new[i]=='号':
            for j in range(i-1,0,-1):
                if address_new[j].isdigit()==False :
                    address_new = address_new[:j+1]
                    break
            break
    return address_new



"""
def search_database(region,section,road,shape,year):
    try:

        #name_to_region = ['keelung', 'newtaipei', 'taipei', 'taoyuan', 'hsinchu', 'miaoli', 'taichung', 'nantou', 'changhua', 'chiayi', 'yunlin', 'tainan',
        # 'kaohsiung', 'pingtung', 'taitung', 'hualien', 'yilan', 'penghu', 'kinmen','lienchiang','hsinchucounty','chiayicity']
        name_to_region ={'基隆市':'keelung','台北市':'taipei','新北市':'newtaipei','桃園市':'taoyuan',
                         '新竹市':'hsinchu','苗栗縣':'miaoli','台中市':'taichung','南投縣':'nantou',
                         '彰化縣':'changhua','嘉義縣':'chiayi','雲林縣':'yunlin','台南市':'tainan',
                         '高雄市':'kaohsiung','屏東縣':'pingtung','台東縣':'taitung','花蓮縣':'hualien',
                         '宜蘭縣':'yilan','澎湖縣':'penghu','金門縣':'kinmen','連江縣':'lienchiang',
                         '新竹縣':'hsinchucounty','嘉義市':'chiayicity'}


        year_max = ""
        year_min = ""
        if year=="2018":
            year_max = 1546300799
            year_min = 1514764800
        if year=="2017":
            year_max = 1514764799
            year_min = 1483228800
        if year=="2016":
            year_max = 1483228799
            year_min = 1451606400
        if year=="2015":
            year_max = 1451606399
            year_min = 1420070400
        if year=="2014":
            year_max = 1420070399
            year_min = 1388534400
        if year=="2013":
            year_max = 1388534399
            year_min = 1356998400
        if year=="2012":
            year_max = 1356998399
            year_min = 1325376000
        if year=="2011":
            year_max = 1325375999
            year_min = 1293840000
        if year=="2010":
            year_max = 1293839999
            year_min = 1262304000
        if year=="2009":
            year_max = 1262303999
            year_min = 1230768000
        if year=="2008":
            year_max = 1230767999
            year_min = 1199145600

        if shape=="電梯大樓":
            shape_type = "shape_name LIKE '電梯大樓'"
        if shape=="公寓":
            shape_type = "shape_name LIKE '公寓'"
        if shape=="透天/別墅":
            shape_type = "(shape_name LIKE '透天厝' OR shape_name LIKE '別墅')"

        road_buf = "%" + road + "%";
        sql = "SELECT * FROM `"+name_to_region[region]+"` WHERE " + shape_type + " AND section_name LIKE %s AND address LIKE %s AND createtime>%s AND createtime<%s "
        result = cursor.execute(sql,(str(section),str(road_buf),year_min,year_max));
        db.commit()
        results_list = cursor.fetchall()
        return results_list
    except:
        db.rollback()
"""

def section_search(city):
    section_list={'台北市':['松山區','信義區','大安區','中山區','中正區','中山區','大同區','萬華區','文山區'
                         ,'南港區','內湖區','士林區','北投區'],
                  '新北市':['板橋區','三重區','中和區','永和區','新莊區','新店區','土城區','蘆洲區'
                            ,'汐止區','樹林區','淡水區','鶯歌區','三峽區','瑞芳區','五股區','泰山區','林口區','深坑區'
                            ,'石碇區','坪林區','三芝區','石門區','八里區','平溪區','雙溪區','貢寮區'
                            ,'金山區','萬里區','烏來區'],
                  '桃園市':['桃園區','中壢區','大溪區','楊梅區','蘆竹區','大園區','龜山區','八德區','龍潭區'
                            ,'平鎮區','新屋區','觀音區','復興區'],
                  '台中市':['中區','東區','南區','西區','北區','西屯區','南屯區','北屯區'
                            ,'豐原區','東勢區','大甲區','清水區','沙鹿區','梧棲區','后里區','神岡區'
                            ,'潭子區','大雅區','新社區','石岡區','外埔區','大安區','烏日區','大肚區'
                            ,'龍井區','霧峰區','太平區','大里區','和平區'],
                  '台南市':['新營區','鹽水區','白河區','柳營區','後壁區','東山區','麻豆區','下營區'
                            ,'六甲區','官田區','大內區','佳里區','學甲區','西港區','七股區','將軍區'
                            ,'北門區','新化區','善化區','新市區','安定區','山上區','玉井區','楠西區'
                            ,'南化區','左鎮區','仁德區','歸仁區','關廟區','龍崎區','永康區','東區'
                            ,'南區','北區','安南區','安平區','中西區'],
                  '高雄市':['鹽埕區','鼓山區','左營區','楠梓區','三民區','新興區','前金區','苓雅區'
                            ,'前鎮區','旗津區','小港區','鳳山區','林園區','大寮區','大樹區','大社區'
                            ,'仁武區','鳥松區','岡山區','橋頭區','燕巢區','田寮區','阿蓮區','路竹區'
                            ,'湖內區','茄萣區','永安區','彌陀區','梓官區','旗山區','美濃區','六龜區'
                            ,'甲仙區','杉林區','內門區','茂林區','桃源區','那瑪夏區'],
                  '基隆市':['中正區','七堵區','暖暖區','仁愛區','中山區','安樂區','信義區'],
                  '新竹縣':['竹北市','竹東鎮','新埔鎮','湖口鄉','新豐鄉','芎林鄉','橫山鄉','北埔鄉'
                            ,'寶山鄉','關西鎮','峨眉鄉','尖石鄉','五峰鄉'],
                  '苗栗縣':['苗栗市','苑裡鎮','通霄鎮','竹南鎮','頭份鎮','後龍鎮','卓蘭鎮','大湖鄉'
                            ,'公館鄉','銅鑼鄉','南庄鄉','頭屋鄉','三義鄉','西湖鄉','造橋鄉'
                            ,'三灣鄉','獅潭鄉','泰安鄉'],
                  '南投縣':['南投市','埔里鎮','草屯鎮','竹山鎮','集集鎮','名間鄉','鹿谷鄉','中寮鄉'
                            ,'魚池鄉','國姓鄉','水里鄉','信義鄉','仁愛鄉'],
                  '彰化縣':['彰化市','鹿港鎮','和美鎮','線西鄉','伸港鄉','福興鄉','秀水鄉','花壇鄉','芬園鄉'
                            ,'員林鎮','溪湖鎮','田中鎮','大村鄉','埔鹽鄉','埔心鄉','永靖鄉'
                            ,'社頭鄉','二水鄉','北斗鎮','二林鎮','田尾鄉','埤頭鄉','芳苑鄉','大城鄉','竹塘鄉'
                            ,'溪州鄉'],
                  '雲林縣':['斗六市','斗南鎮','虎尾鎮','西螺鎮','土庫鎮','北港鎮','古坑鄉','大埤鄉'
                            ,'莿桐鄉','林內鄉','二崙鄉','崙背鄉','麥寮鄉','東勢鄉','褒忠鄉'
                            ,'台西鄉','元長鄉','四湖鄉','口湖鄉','水林鄉'],
                  '嘉義縣':['太保市','朴子市','布袋鎮','大林鎮','民雄鄉','溪口鄉','新港鄉','六腳鄉'
                            ,'東石鄉','義竹鄉','鹿草鄉','水上鄉','中埔鄉','竹崎鄉','梅山鄉'
                            ,'番路鄉','大埔鄉','阿里山鄉'],
                  '屏東縣':['屏東市','潮州鎮','東港鎮','恆春鎮','萬丹鄉','長治鄉','麟洛鄉','九如鄉'
                            ,'里港鄉','鹽埔鄉','高樹鄉','萬巒鄉','內埔鄉','竹田鄉','新埤鄉'
                            ,'枋寮鄉','新園鄉','崁頂鄉','林邊鄉','南州鄉','佳冬鄉','琉球鄉'
                            ,'車城鄉','滿州鄉','枋山鄉','三地門鄉','霧台鄉','瑪家鄉','泰武鄉'
                            ,'來義鄉','春日鄉','獅子鄉','牡丹鄉'],
                  '台東縣':['台東市','成功鎮','關山鎮','卑南鄉','鹿野鄉','池上鄉','東河鄉','長濱鄉'
                            ,'太麻里鄉','大武鄉','綠島鄉','海端鄉','延平鄉','金峰鄉','達仁鄉'
                            ,'蘭嶼鄉'],
                  '花蓮縣':['花蓮市','鳳林鎮','玉里鎮','新城鄉','吉安鄉','壽豐鄉','光復鄉','豐濱鄉'
                            ,'瑞穗鄉','富里鄉','秀林鄉','萬榮鄉','卓溪鄉'],
                  '宜蘭縣':['宜蘭市','羅東鎮','蘇澳鎮','頭城鎮','礁溪鄉','壯圍鄉','員山鄉','冬山鄉','五結鄉'
                            ,'三星鄉','大同鄉','南澳鄉'],
                  '澎湖縣':['馬公市','湖西鄉','白沙鄉','西嶼鄉','望安鄉','七美鄉'],
                  '連江縣':['南竿鄉','北竿鄉','莒光鄉','東引鄉'],
                  '新竹市':['東區','北區','香山區'],
                  '嘉義市':['東區','西區'],
                  '金門縣':['金城鎮','金湖鎮','金沙鎮','金寧鄉','烈嶼鄉','烏坵鄉']}
    return section_list[city]

roadlist_utf8 = []
roadlist_ansi = []
def init_roadlist():
    global roadlist_utf8
    global roadlist_ansi
    SaveDirectory = os.getcwd() #印出目前工作目錄
    with open(SaveDirectory+'/FInd_Real_Fake_Price_Website/opendata107road_UTF8.csv', newline='', encoding='utf-8') as csvfile_utf8:
        csv_reader_utf8 = csv.reader(csvfile_utf8)
        for row in csv_reader_utf8:
            roadlist_utf8.append(row)
    with open(SaveDirectory+'/FInd_Real_Fake_Price_Website/opendata107road.csv', newline='', encoding='utf-8') as csvfile_ansi:
        csv_reader_ansi = csv.reader(csvfile_ansi)
        for row in csv_reader_ansi:
            roadlist_ansi.append(row)


def road_index(city,section,road):
    index = 0
    index = roadlist_utf8.index([city,city+section,road])
    road_buf = roadlist_ansi[index] 
    return road_buf[2]



def road_search(city,section):
    result_list = []
    for row in roadlist_utf8:
        for_loop_break = False
        region_section = city + section;
        site_id_buf = row[1]
        if site_id_buf==region_section :
            result_list.append(row[2])
            for_loop_break = True
        else:
            if for_loop_break==True:
                break;
    return result_list
