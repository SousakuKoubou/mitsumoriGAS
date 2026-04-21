//GASコード
function getData(){
    var all_data =  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("記入シート").getDatarange().getValues();
    return all_data;
}

//見積詳細の辞書を作成する関数
function create_child_dict(){
    var all_data = getData();
    var result = [];
    //全てのデータを行数分ループ
    for(var i = 1; i < all_data.length; i++){
        //1列目の値が10以下の場合、辞書に追加
        if(all_data[i][1] >= 1 && all_data[i][1] <= 25){
            var dict = {};
            var key = "見積ID";
            var value = i+1; //列をIDにする
            dict[key] = value;
            //10列目をキーにする
            for(var j = 0; j < all_data[i].length; j++){
                var key = all_data[9][j]; //10行目ヘッダー
                var value = all_data[i][j]; 
                dict[key] = value;
            }
            result.push(dict);
        }else if(all_data[i][1] >= 26 && all_data[i][1] <= 27){
            var dict = {};
            //10列目をキーにする
            for(var j = 0; j < all_data[i].length; j++){
                if(all_data[i][j] == "") continue; //空のセルはスキップ
                else if(j == 0 || j == 1){ //A列とB列はIDと番号
                    var key = all_data[9][j]; //10行目ヘッダー
                    var value = all_data[i][j]; 
                    dict[key] = value;
                }else if(j == 2 || j == 14){ //C列とO列は備考
                    var key = "備考_P"+(all_data[i][0])+"R"+(all_data[i][1])+"C"+(j+1); //P数+P行数+列数
                    var value = all_data[i][j]; 
                    dict[key] = value;
                }else{ //その他の列は行+列の番号をキーにする
                    var key = "R"+(i+1)+"C"+(j+1);
                    var value = all_data[i][j];
                    dict[key] = value;
                };
            }
            result.push(dict);
        }
    }
    return result;
}

//親の辞書を作成する関数
function parent_child_dict(){
    var parent_dict = {};

    var key = "ID";
    var value = Utilities.getUuid(); //ユニークIDを生成するロジックをここに追加
    parent_dict[key] = value;

    // parent_dict を作成するロジックをここに追加
    var parent_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("処理用").getDatarange().getValues();
    
    for(var i = 1; i < parent_data.length; i++){
        var key = parent_data[0][i]; // A列をキーにする
        var value = parent_data[1][i]; // B列目を値にする
        parent_dict[key] = value;
    }

    var child_dict = create_child_dict();
    
    //parent_dict に child_dict を　見積詳細として追加する
    parent_dict["見積詳細"] = child_dict;
    return parent_dict;
}

//テストタブにparent_child_dictの内容を出力する関数
function outputToTestTab(){
    var parent_child_data = parent_child_dict();
    var test_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("テスト");
    test_sheet.getRange(1, 1).setValue(JSON.stringify(parent_child_data));
}