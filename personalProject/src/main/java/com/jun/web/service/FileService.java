package com.jun.web.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

	public boolean setProfileImage(MultipartFile file, String extension, String url) throws IOException;
}
