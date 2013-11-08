$(document)
		.ready(
				function() {

					$("#klik")
							.click(
									function() {
										alert("Dziala");
										PouchDB("'idb://baza",	function(err, pouchdb) {
													if (err) {
														alert("Can't open pouchdb database");
													} else {
														console.log("dzia³¹ pouchdb");
														db = pouchdb;
														db.allDocs(	{include_docs: true, descending: true}, function( err, res) {
																			if (!err) {
																				console.log("bez bledow");
																				var out = "sddds";
																				console.log(res);
																				//console.log(db.info());
																				res.rows.forEach(function(element) {
																					console.log(element);
																							out += element.doc._id + '<br>';
																							console.log("out = " + out);
																							
																						});
																				document.getElementById('display-area').innerHTML = out;
																				
																			}
																		});

													}

												});
									});

				});