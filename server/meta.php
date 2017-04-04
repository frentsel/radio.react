<?php

function getMp3StreamTitle($streamingUrl, $interval, $offset = 0, $headers = true)
{
    $needle = 'StreamTitle=';
    $ua = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36';

    $opts = ['http' =>
        [
            'method' => 'GET',
            'header' => 'Icy-MetaData: 1',
            'user_agent' => $ua
        ]
    ];

    $context = stream_context_create($opts);

    if ($stream = fopen($streamingUrl, 'r', false, $context))
    {
        $buffer = stream_get_contents($stream, $interval, $offset);
        fclose($stream);

        if (strpos($buffer, $needle) !== false)
        {
            $currentSectionTwo = explode($needle, $buffer);
            $title = $currentSectionTwo[1];
            return substr($title, 1, strpos($title, ';') - 2);
        }
        else
            return getMp3StreamTitle($streamingUrl, $interval, $offset + $interval, false);
    }
    else
        throw new Exception("Unable to open stream [{$streamingUrl}]");
}

if(!empty($_GET['id'])){

    $id = (int) $_GET['id'];
    $fileName = $id.'.json';
    $cachePath = __DIR__.'/../data/cache';
    $cachefile = $cachePath.'/'.$fileName;
    $cachetime = 15;

    // Обслуживается из файла кеша, если время запроса меньше $cachetime
    if (file_exists($cachefile) && time() - $cachetime < filemtime($cachefile)) {
        die(file_get_contents($cachefile));
    } else {
        $stations = json_decode(file_get_contents(__DIR__.'/../data/stations.json'));

        if(!empty($stations[$id]->radio)){
            $data = [
            	"track" => getMp3StreamTitle($stations[$id]->radio, 19200)
			];
            file_put_contents($cachefile, json_encode($data, JSON_UNESCAPED_UNICODE));
            die(json_encode($data, JSON_UNESCAPED_UNICODE));
        }
    }
}

if(!empty($_GET['url']) && filter_var($_GET['url'], FILTER_VALIDATE_URL)){

    $url = $_GET['url'];

	$data = [
		"track" => getMp3StreamTitle($url, 19200)
	];
	die(json_encode($data, JSON_UNESCAPED_UNICODE));
}