function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function validateCreateAcc(){
    var firstName,lastName, emailAddress,password,confirmPassword;
    firstName = $('#txtFirstName').val();
    lastName = $('#txtLastName').val();
    emailAddress = $('#txtEmailAdd').val();
    password = $('#txtPassword').val();
    confirmPassword = $('#txtConfPassword').val();
    var $mobileNumber = $('#divMobileNumber');
    var $alert=$('.alert'), $errorMsg = $('.alert .error-msg');
    if( firstName === '' || lastName === '' || emailAddress === '' || password === '' || confirmPassword === '' ){
        $errorMsg.text('Please enter all required information before continuing.');
        $alert.removeClass('hide');
        $errorMsg.focus();
        return false;
    } else if(!isValidEmailAddress(emailAddress)){
        $errorMsg.text('Please enter a valid email address.');
        $alert.removeClass('hide');
        $errorMsg.focus();
        return false;
    } else if(password!==confirmPassword){
        $errorMsg.text('Password and confirmation password should match.');
        $alert.removeClass('hide');
        $errorMsg.focus();
        return false;
    } else if(!$mobileNumber.hasClass('hide') && $('#txtPhoneNumber').val()===''){
        $errorMsg.text('Please enter a mobile number to text about exclusive sales and promotions.');
        $alert.removeClass('hide');
        $errorMsg.focus();
        return false;
    } else{
        $alert.addClass('hide');
        return true;
    }
}

$(document).ready(function(){
    $('#chkTextMe').click(function(){
        if ($(this).is(':checked')){
            $('#divMobileNumber').removeClass('hide');
        } else{
            $('#divMobileNumber').addClass('hide');
        }
    });

    $('#btnContinue').click(function(){
        if(validateCreateAcc()){
            $('button#btnContinue').addClass('hide');
            $('button#loadingbtn').removeClass('hide');
            setTimeout(
                function()
                {
                    localStorage.setItem("name",$('#txtFirstName').val() + ' '+ $('#txtLastName').val());
                    window.location.replace("file:///C:/Users/ms453/Documents/Workspace/mw-poc/step2/step2.html");
                }, 5000);
        }
    });

});
