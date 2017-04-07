<?php

class LastFM {

	public static $data = array();

	public static function escape($str)
	{
		return urlencode(strip_tags($str));
	}

	public static function getArtistImages($params, $page = 1)
	{
		if(!empty($params['artist']))
		{
			$artist = LastFM::escape($params['artist']);
			$url = "http://www.last.fm/music/$artist/+images?page=$page";
			$html = @file_get_contents($url);

			preg_match_all('#<img.*class=\"image-list-image\".*src=\"([^\"]+)"#iSUs', $html, $res);

			foreach($res[1] as $n => $val)
			{
				self::$data[] = $res[1][$n];
			}

			if($page < 1)
			{
				$page++;
				LastFM::getArtistImages($params, $page);
			} else {
				die(json_encode(self::$data));
			}
		}
		die;
	}

	public static function getAlbums($params, $page = 1)
	{
		if(!empty($params['artist']))
		{
			$artist = LastFM::escape($params['artist']);
			$url = "http://www.last.fm/music/$artist/+albums?page=$page";
			$html = file_get_contents($url);

			preg_match_all('#(https://lastfm-img2.akamaized.net/i/u/300x300/[^\.]+\.(png|jpe?g|gif)).*(alt=\"([^\"]+)\")#SUsim', $html, $res);

			foreach($res[1] as $n => $val)
			{
				self::$data[] = array(
					"img" => $res[1][$n],
					"name" => $res[4][$n]
				);
			}

			if($page < 2)
			{
				$page++;
				LastFM::getAlbums($params, $page);
			} else {
				die(json_encode(self::$data));
			}
		}
		die;
	}
}

if(!empty($_GET['method']))
{
	$method = LastFM::escape($_GET['method']);
	LastFM::$method($_GET);
}