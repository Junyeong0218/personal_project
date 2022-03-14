<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="EUC-KR">
		<title>map test</title>
		<script type="text/javascript"
			src="//dapi.kakao.com/v2/maps/sdk.js?appkey=879223fdb605bce94d0094de10b34048&libraries=services"></script>
			<script src="/js/jquery-3.6.0.min.js"></script>
		<script type="text/javascript" src="/js/maps/kakao.js"></script>
    <link href="/css/maps/maps.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		<div id="container">

			<main>
				<div id="search-bar">
					<div id="input-keyword">
						<input type="text" id="searcher" placeholder="목적지를 입력해 주세요" onkeypress="searchKeyword()">
						<ul id="searched-places"></ul>
					</div>
					<button type="button" id="search-btn">
						<span>검색</span>
					</button>
				</div>
				<div id="maps" style="width: 800px; height: 800px;">


				</div>

			</main>
			
			<aside>
				<div id="scheduler">
					<div id="schedule-header">
						<span>Tour Schedule</span>
					</div>
					<div id="start-place">
						<div class="place-texts">
							<span>시작 지점</span>
							<span class="place-name"></span>
						</div>
						<button class="Deletewaypoint" type="button"></button>
					</div>
				</div>
			</aside>

		</div>
		
		<script src="/js/maps/maps.js"></script>
	</body>

	</html>