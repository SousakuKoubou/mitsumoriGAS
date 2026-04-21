function SpreadSheet(){
    return SpreadsheetApp
        .openById("1KWIw_2e26BvIPEJQqBkyeZ_Mclbsqu5B2hwHrciPcQo")
        .getSheetByName("DB"); //spreadssheetapp IDで指定してシートを取得する 
} 

function readParentSheetData(){    
    var sheet = SpreadSheet();
    return sheet.getDataRange().getValues();
}

function create_child_ID(){
    var child_ID_List = {
        "田中": "",
        "山田": "",
        "佐藤": "1_jg3LGjmXXyfGpH09LPJCqH3FP3_QMgCtISXbY9GjEg",
        "鈴木": "",
    };
    return child_ID_List;
}

function dataChecker(){
    console.info("-----------親DBに記入開始-----------")
    var sheet = SpreadSheet(); 
    var parent_all_data = readParentSheetData();
    //辞書を作成する関数を呼び出し一次的に辞書を作成する
    var main_data = parent_child_dict(); //入力データの辞書
    for(var j = 0; j < 18; j++){     
        var setdata = main_data[parent_all_data[0][j]];
        sheet.getRange(parent_all_data.length+1, j+1).setValue(setdata);
        if(setdata != undefined){
            count++;
        }
    }
    console.info(count+"件のデータを記入しました。");
    console.info("-----------親DBに記入完了-----------")
    
    ///////子DBに記入するロジック///////
    console.info("-----------子DBに記入開始-----------")


}


