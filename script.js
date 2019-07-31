let good   = 'Всё заебумба',
    delay  = 'Задерживается',
    cancel = 'Отменён',
    resis  = [
    {
        from: 'Russia',
        to: 'Germany',
        number: '2780',
        status: good
    },
    {
        from: 'India',
        to: 'Russia',
        number: '9372',
        status: cancel
    },
    {
        from: 'USA',
        to: 'Russia',
        number: '0372',
        status: good
    },
    {
        from: 'Russia',
        to: 'Italy',
        number: '6452',
        status: good
    },
    {
        from: 'Russia',
        to: 'France',
        number: '9458',
        status: delay
    },
    {
        from: 'Russia',
        to: 'Germany',
        number: '4677',
        status: good
    },
    {
        from: 'Germany',
        to: 'Russia',
        number: '2931',
        status: delay
    },
    {
        from: 'Ukrain',
        to: 'Russia',
        number: '8772',
        status: delay
    },
    {
        from: 'Russia',
        to: 'Ukrain',
        number: '9902',
        status: delay
    },
    {
        from: 'Pakistan',
        to: 'Russia',
        number: '3485',
        status: good
    },
    {
        from: 'Russia',
        to: 'Belarus',
        number: '1028',
        status: good
    },
];

function sortSelect(value) {
    let res = []
    if(value == 'Только вылетающие') {
        for(let i = 0; i < resis.length; i++) {
            if(resis[i].from == 'Russia') res.push(resis[i]);
        }
    }else if(value == 'Только прилетающие') {
        for(let i = 0; i < resis.length; i++) {
            if(resis[i].to == 'Russia') res.push(resis[i]);
        }
    }else if(value == 'Задержанные') {
        for(let i = 0; i < resis.length; i++) {
            if(resis[i].status == delay) res.push(resis[i]);
        }
    }else if(value == 'Отмененные') {
        for(let i = 0; i < resis.length; i++) {
            if(resis[i].status == cancel) res.push(resis[i]);
        }
    }

    return res;
}

///////////////////////////////////

let error_status = false;

$('input[type="button"]').click(() => {
    let number = $('input[type="text"]').val();

    if(number.length != 4) {
        $('input[type="text"]').css('background-color', '#FF8080');
        if(!error_status) {
            error_status = true;
            $('input[type="button"]').after('<span>Error</span>');
        }
    }else {
        if(error_status) {
            error_status = false;
            $('input[type="text"]').css('background-color', 'white');
            $('span').remove();
        }

        let noneReisis = false;
        $('.result ul li').remove();

        for(let i = 0; i < resis.length; i++) {
            console.log('тут пока что гуд');
            if(resis[i].number == number) {
                $('.result ul').append(`<li>Из ${resis[i].from} в ${resis[i].to}, номер рейса: ${resis[i].number}, статус: ${resis[i].status}</li>`);
                break;
            }else if(i == resis.length - 1) {
                if(!noneReisis) {
                    $('.result ul').append('<li>Таких рейсов нет, памянем<li>');
                    noneReisis = true;
                }
            }
        }
    } // end else global
}); // end click

let checkboxStatus = false;

$('input[type="checkbox"]').click(() => {
    $('.result ul li').remove();
    if(checkboxStatus) {
        $('select').prop('disabled', true);
        checkboxStatus = false;
    }else {
        $('select').prop('disabled', false);
        checkboxStatus = true;
        let selectValue = $('select').val();
        let res = sortSelect(selectValue);

        for(let i = 0; i < res.length; i++) {
            $('.result ul').append(`<li>Из ${res[i].from} в ${res[i].to}, номер рейса: ${res[i].number}, статус: ${res[i].status}</li>`);
        }
    }
}); // end click

$('select').change(() => {
    $('.result ul li').remove();
    let selectValue = $('select').val();
    let res = sortSelect(selectValue);

    for(let i = 0; i < res.length; i++) {
        $('.result ul').append(`<li>Из ${res[i].from} в ${res[i].to}, номер рейса: ${res[i].number}, статус: ${res[i].status}</li>`);
    }
}); // end change
