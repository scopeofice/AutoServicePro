package com.app.services;

import java.util.List;

import com.app.dto.ServiceDTO;
import com.app.entities.Services;

public interface ServicesService {

	Services addService(ServiceDTO transientService);

	List<Services> getAllServices();

	String deleteService(Integer id);



	Services updateServiceDetails(Services detachedService);
	
	ServiceDTO getServiceByName(String name);

	ServiceDTO getServiceById(Integer id);
	
	

}
