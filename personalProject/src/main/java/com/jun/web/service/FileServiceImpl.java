package com.jun.web.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.StringTokenizer;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {
	
	private final String SEP = File.separator;

	@Override
	public boolean setProfileImage(MultipartFile file, String extension, String url) throws IOException {
		
		boolean uploadFlag = false;

		String fileName = file.getOriginalFilename();
		
		File tempFile = new File(url);
		if(!tempFile.exists()) {
			tempFile.mkdirs();
		}
		
		System.out.println(url);
		
		InputStream fis = file.getInputStream();
		String filePath = url + SEP + "profile_image." + extension;
		FileOutputStream fos = new FileOutputStream(filePath);

		byte[] buf = new byte[1024];
		int size = 0;
		while( (size = fis.read(buf)) != (-1) ) {
			fos.write(buf, 0, size);
		}
		
		uploadFlag = true;
			
		fis.close();
		fos.close();
		
		return uploadFlag;
	}
}
