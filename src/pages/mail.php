<?php
// Загрузка фйлов на сервер
if(isset($_GET['files'])){
    $data = array();
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < 5; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    $error = false;
    $files = array();
    $dateForFile = date('Y-m-d-H-i-s');
    $uploaddir = $_SERVER['DOCUMENT_ROOT'].'/form_upload_files_7y3t789h/';
     
    if (!file_exists($uploaddir)) {
        if(!mkdir($uploaddir, 0755, true)){
            $error = "Ошибка создания папки \"".$uploaddir."\". Код - dir01";
             
        }
    }
    if(!$error){
        foreach($_FILES as $file){
            $path_info = pathinfo($file['name']);
            $onlyfilename = $dateForFile."-".$randomString."-".basename($file['tmp_name'].".".$path_info['extension']);
            $newfilename = $uploaddir.$onlyfilename;
             
            if(move_uploaded_file($file['tmp_name'], $newfilename)){
                $files[] = $uploaddir .$file['name'];
            }
            else{
                switch($file['error']){
                    case 0: $error = "Произошла ошибка. Код - 0"; break;
                    case 1: $error = "Ошибка. Превышен лимит размера файла. Код - 1"; break;
                    case 2: $error = "Ошибка. Превышен лимит размера файла. Код - 2"; break;
                    case 3: $error = "Произошла ошибка при загрузке файла. Код - 3"; break;
                    case 4: $error = "Произошла ошибка при загрузке файла. Код - 4"; break;
                    case 5: $error = "Произошла ошибка при загрузке файла. Код - 5"; break;
                    case 6: $error = "Произошла ошибка при загрузке файла. Код - 6"; break;
                    case 7: $error = "Произошла ошибка при загрузке файла. Код - 7"; break;
                    case 8: $error = "Произошла ошибка при загрузке файла. Код - 8"; break;
                }
            }
        }
    }
    $data = ($error) ? array('error' => $error) : array('files' => $files, 'filename' => $newfilename,'onlyfilename' => $onlyfilename, 'extension' => $path_info['extension']);
    echo json_encode($data);
}
 
 
// Обработчик запроса AJAX при отправке формы
if($_SERVER['REQUEST_METHOD'] == 'POST' AND !empty($_POST['data1'])){
    $key = json_decode($_POST['data1'], true);
    if($key){
        $message = "<h1>".strip_tags($key['header'])."</h1>\r\n";
        $message .= "<table><tbody>";
        foreach($key['fields'] as $v){
            $message .= "<tr><td><strong>".strip_tags($v['title']).":<strong> </td><td>".strip_tags($v['value'])."</td></tr>\r\n";
        }
        $message .= "</tbody></table>";
    }else{ //Заглушка при косячном хостинге
        $message = "<h1>".strip_tags($key['header'])."</h1>\r\n";
        $message .= "<p>На сервере не работает json_decode. Возможно проблема связана с настройкой PHP: MagicQuotes. Необходимо обратиться в техподдержку хостинга.<br>А пока данные в сыром виде:</p>\r\n";
        $message .= $_POST['data1'];
    }
    $sitename = $_SERVER['HTTP_HOST'];
    $to      = 'mail@digital-banana.ru'; // Укажите свой почтовый ящик
    $subject = 'Заявка с сайта!!!!!!'.$sitename;
    $subject = '=?utf-8?b?'. base64_encode($subject) .'?=';
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
    $headers .= "Заяка с сайта! <info@".$sitename.">". "\r\n";
 
   if (mail($to, $subject, $message, $headers)){
       echo '{"result":"Спасибо! Ваша заявка принята!"}';
   }
   else{
       echo '{"result":"Ошибка.."}';
   }
}else{
//Генерация формы:
 
// ПРИМЕР ВЫЗОВА:
// <a href="js/mail.php?formtitle=Заказать%20звонок&formsubmit=Жду%20звонка!&mailtitle=Заказать%20звонок&postfix_class=yoyo" class="call_back_form_trigger">Заказать звонок</a>
// <script>$('.call_back_form_trigger').fancybox({type: 'ajax'});</script>
 
    // можно отдавать разные варианты формы if($_GET['fbtype'] == 1){}
    //Настройки формы:
    $formtitle = "Заказать обратный звонок";
    $formsubmit = "Отправить";
    $mailtitle = "Контактная информация";
    $postfix_class = "FBajaxloadedform";
     
    if(!empty($_GET['formtitle'])){$formtitle = strip_tags($_GET['formtitle']);}
    if(!empty($_GET['formsubmit'])){$formsubmit = strip_tags($_GET['formsubmit']);}
    if(!empty($_GET['mailtitle'])){$mailtitle = strip_tags($_GET['mailtitle']);}
    if(!empty($_GET['postfix_class'])){$postfix_class = strip_tags($_GET['postfix_class']);}
?>
<style>
.feedBackWrapper.<?php echo $postfix_class; ?> {
border: 0;
margin: 0;
padding:0 25px;
}
.feedBackWrapper.<?php echo $postfix_class; ?> table {
    width:100%;
}
.feedBackWrapper.<?php echo $postfix_class; ?> td {
padding: 0;
vertical-align: middle;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .fbw-title {
font-size: 16px;
white-space: nowrap;
padding-right: 10px;
width:150px;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .form-h3 {
text-align: center;
margin-top: 15px;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .ajaxgo {
padding: 5px 40px;
background: #FFC200;
background: -moz-linear-gradient(top,  #ffd65e 0%, #ffc200 43%, #fcb400 100%);
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffd65e), color-stop(43%,#ffc200), color-stop(100%,#fcb400));
background: -webkit-linear-gradient(top,  #ffd65e 0%,#ffc200 43%,#fcb400 100%);
background: -o-linear-gradient(top,  #ffd65e 0%,#ffc200 43%,#fcb400 100%);
background: -ms-linear-gradient(top,  #ffd65e 0%,#ffc200 43%,#fcb400 100%);
background: linear-gradient(to bottom,  #ffd65e 0%,#ffc200 43%,#fcb400 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffd65e', endColorstr='#fcb400',GradientType=0 );
font-size: 18px;
border-radius: 3px;
cursor:pointer;
outline: none;
border:0;
border-bottom: 3px solid #D3A000;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .ajaxgo:focus {
outline:1px dashed #ccc;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .ajaxgo:hover {
background: #FFC200;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .ajaxgo:active {
border: 0;
margin-top: 3px;
outline:none;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .ajaxgo-wr{
height: 38px;
padding-top:25px;
text-align:center;
margin-bottom: 25px;
position: relative;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .fbw-text{
margin: 6px 0;
box-sizing: border-box;
padding: 6px;
border: 1px solid #ccc;
outline: none;
box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
width:100%;
font-family:inherit;
}
.feedBackWrapper.<?php echo $postfix_class; ?> .fbw-text:focus {
border-color: #66afe9 !important;
outline: 0;
-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,1);
box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,1);
}
.feedBackWrapper.<?php echo $postfix_class; ?> .ajax-trigger {
text-align: center;
padding: 1px;
}
</style>
    <div class="feedBackWrapper <?php echo $postfix_class; ?>">
        <h3 class="form-h3"><?php echo $formtitle; ?></h3>
        <table>
            <tbody>
                <tr>
                    <td class="fbw-title">Имя<span style="color:red;">*</span>:</td>
                    <td><input type="text" placeholder="Имя" class="isrequired fbw-text form-control"></td>
                </tr>
                <tr>
                    <td class="fbw-title">Номер телефона<span style="color:red;">*</span>:</td>
                    <td><input type="text" placeholder="Телефон" class="isrequired fbw-text form-control"></td>
                </tr>
                <tr>
                    <td class="fbw-title">E-mail:</td>
                    <td><input type="text" placeholder="E-mail" class="fbw-text form-control"></td>
                </tr>
                <?php /*
                <tr>
                    <td class="fbw-title">Цвет:</td>
                    <td><label><input type="checkbox" placeholder="Цвет" title="Синий">Синий</label><label><input type="checkbox" placeholder="Цвет" title="Зеленый">Зеленый</label><label><input type="checkbox" placeholder="Цвет" title="Красный">Красный</label></td>
                </tr>
                <tr>
                    <td class="fbw-title">Вкус:</td>
                    <td><label><input type="radio" name='radio1' placeholder="Вкус" title="Сладкий">Сладкий</label><label><input type="radio" name='radio1' placeholder="Вкус" title="Соленый">Соленый</label><label><input type="radio" name='radio1' placeholder="Вкус" title="Горький">Горький</label></td>
                </tr>
                */ ?>
                <tr>
                    <td class="fbw-title">Комментарий:</td>
                    <td><textarea placeholder="Комментарий" class="fbw-text form-control"></textarea></td>
                </tr>
            </tbody>
        </table>
        <div class="ajax-trigger">
            <button class="ajaxgo <?php echo $postfix_class; ?>"><?php echo $formsubmit; ?></button>
            <div class="successmsg"></div>
        </div>
    </div>
    <script type="text/javascript">
    $(document).ready(function(){
    $(document.body).on("click", ".ajaxgo.<?php echo $postfix_class; ?>", send<?php echo $postfix_class; ?>);
    $(document.body).on("focus", "input", function(){$(this).css("border","");});
    function send<?php echo $postfix_class; ?>(){
        var wr = $(this).parents(".feedBackWrapper.<?php echo $postfix_class; ?>");
        var validate = true;
        wr.find(".isrequired").each(function(){
            if(!$(this).val().length){validate = false; $(this).css("border","1px solid #D22")}
        });
        if (validate){
            var need = {};
            need['header'] = "<?php echo $mailtitle; ?>";
            need['fields'] = [];
            wr.find("input, select, textarea").each(function(){
                var fieldElement = {};
                //Checkbox, Radio
                //Ожидаемая семантика: <input type="checkbox" placeholder="Цвет" title="Синий"> / <input type="radio" name='radio1' placeholder="Вкус" title="Сладкий">
                if($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio'){
                    if($(this).prop('checked') == true){
                        fieldElement['type'] = $(this).attr("type");
                        fieldElement['title'] = $(this).attr("placeholder");
                        fieldElement['value'] = $(this).attr("title");
                        need['fields'][need['fields'].length] = fieldElement;
                    }
                    return true;
                }
                fieldElement['type'] = $(this).attr("type") || 'text';
                fieldElement['title'] = $(this).attr("placeholder");
                fieldElement['value'] = $(this).val();
                need['fields'][need['fields'].length] = fieldElement;
            });
            output = JSON.stringify(need);
            $.ajax({
                type: "POST",
                data: {data1: output},
                url:'<?php echo $_SERVER['PHP_SELF']; ?>',
                dataType:'json',
                success: function(data){
                    wr.find(".ajaxgo").hide();
                    wr.find(".successmsg").html(data.result);
                    wr.find(".successmsg").fadeIn(300).css("display","inline-block");
                },
                error: function (xhr, ajaxOptions, thrownError){
                    console.log(xhr.responseText);
                }
            });
        }
    }
    });
    </script>
<?php
 }
?>