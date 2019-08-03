<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel React Boilerplate</title>

    <!-- Styles -->
    <link rel="preload" href="{{ mix('/css/app.css') }}" as="style">
    <!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
        </script>
</head>

<body>
    <noscript>JavaScript precisa estar habilitado para rodar esta aplicação!</noscript>
    <div id="root"></div>
    
    <!-- Scripts -->
    <script src="{{mix('/js/app.js')}}"></script>
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
</body>

</html>