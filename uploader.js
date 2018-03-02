(function($) {
	$(function() {
		var time = new Date().toISOString();
		$('#fine-uploader').fineUploaderS3({
			debug: true,
			request: {
				endpoint: "https://mimas-erinnerungen.s3-eu-west-1.amazonaws.com/",
				accessKey: "AKIAJZPZVXLIDUP37RAQ"
			},
			signature: {
				endpoint: "/s3/fine-uploader-server.php"
			},
			objectProperties: {
				acl: "public-read",
				key: function(fileId) {
					return "upload/" + time + "/" + fileId + "-" + this.getName(fileId);
				}
			},
			credentials: {
                accessKey: "AKIAJZPZVXLIDUP37RAQ",
                secretKey: "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",
                expiration: new Date('27 Feburary 2019 17:30 UTC').toISOString(),
            },
	        chunking: {
	            enabled: true
	        },
	        resume: {
	            enabled: true
	        },
	        // Restrict files to 15 MB and 5 net files per session
	        validation: {
	            itemLimit: 5,
	            sizeLimit: 15000000
	        },
	        thumbnails: {
	            placeholders: {
	                notAvailablePath: "not_available-generic.png",
	                waitingPath: "waiting-generic.png"
	            }
			}
		})
		.on("complete", function( event, id, name, responseJson, xhr ) {
			var key = this.fineUploaderS3("getKey", id),
	        	    podcastUrl = "https://mimas-erinnerungen.s3.amazonaws.com" + key,
	        	    $fileContainer = this.fineUploader("getItemByFileId", id);
	        	$fileContainer.append('<div><p><strong>File Location:</strong> <a href="' + podcastUrl + '">' + podcastUrl + '</a></p></div>');
		});
	});
}(jQuery));
