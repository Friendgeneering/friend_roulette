import React from 'react';
import ReactS3Uploader from 'react-s3-uploader'

export default () => (
	<div>
	ProfilePage
	<ReactS3Uploader
    signingUrl="/s3/sign"
    accept="image/*"
    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    contentDisposition="auto"
    server="http://localhost:3001" />
	</div>
)