package com.app.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.ServiceDTO;
import com.app.entities.Services;
import com.app.exceptions.ResourceNotFoundException;
import com.app.repository.ServiceRepository;

@Service
@Transactional
public class ServiceImpl implements ServicesService {
	
	@Autowired 
	private ServiceRepository repo;
	
	@Autowired 
	private ModelMapper mapper;

	@Override
	public Services addService(ServiceDTO transientService) {
		// TODO Auto-generated method stub
		Services service=mapper.map(transientService,Services.class);
		return repo.save(service);
	}

	@Override
	public List<Services> getAllServices() {
		// TODO Auto-generated method stub
		List<Services> servList=repo.findAll();
		return servList;
	}

	@Override
	public String deleteService(Integer id) {

		String message =
	  "ServiceID is invalid , can't delete Service details"; if
	  (repo.existsById(id)) { repo.deleteById(id); message =
	  "Service with ServiceId " + id + " is deleted"; } return message;

		// TODO Auto-generated method stub
//		Optional<Services> serviceOptional=repo.findById(id);
//		if(serviceOptional.isPresent()) {
//			Services service=serviceOptional.get();
//			repo.save(service);
//			return "Service with id : "+id+" deleted successfully";
//		}else {
//			return "Service with id : "+id+" does not exists";
//		}
	}



	@Override
	public Services updateServiceDetails(Services updatedService) {
		// Retrieve the existing service entity using its ID
//		Services existingService = repo.findById(updatedService.getServiceId())
//				.orElseThrow(() -> new ResourceNotFoundException("Service Not Found"));
//
//		// Update the properties of the existing service entity with the values from the provided Service object
//		existingService.setServiceName(updatedService.getServiceName());
//		existingService.setDescription(updatedService.getDescription());
//		existingService.setPrice(updatedService.getPrice());
//
//		// Save the updated service entity
//		Services updatedServiceEntity = repo.save(existingService);
//
//		// Convert and return the updated service entity as DTO
//		ServiceDTO updatedServiceDTO = mapper.map(updatedServiceEntity, ServiceDTO.class);
		return repo.save(updatedService);
	}


	@Override
	public ServiceDTO getServiceByName(String name) {
		// TODO Auto-generated method stub
		Services service=repo.findByServiceName(name).orElseThrow(()-> new ResourceNotFoundException("Service Not Found"));
		ServiceDTO serviceDTO=mapper.map(service, ServiceDTO.class);
		return serviceDTO;
	}

	@Override
	public ServiceDTO getServiceById(Integer id) {
		// TODO Auto-generated method stub
		Services service=repo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Service Not Found"));
		ServiceDTO serviceDTO=mapper.map(service, ServiceDTO.class);
		return serviceDTO;
	}

	/*
	 * @Autowired private ServiceRepository repo;
	 * 
	 * @Autowired private ModelMapper mapper;
	 * 
	 * @Override public Services addService(ServiceDTO transientService) { Services
	 * newService=mapper.map(transientService, Services.class); return
	 * repo.save(newService); }
	 * 
	 * @Override public List<ServiceDTO> getAllServices() { List<Services>
	 * serviceEntities = repo.findAll(); return serviceEntities.stream()
	 * .map(service -> mapper.map(service, ServiceDTO.class))
	 * .collect(Collectors.toList()); }
	 * 
	 * @Override public String deleteService(Integer id) { String message =
	 * "ServiceID is invalid , can't delete Service details"; if
	 * (repo.existsById(id)) { repo.deleteById(id); message =
	 * "Service with ServiceId " + id + " is deleted"; } return message; }
	 * 
	 * @Override public Services getServiceById(Integer id) { return
	 * repo.findById(id).orElseThrow(() -> new
	 * ResourceNotFoundException("Service Not Found")); }
	 * 
	 * @Override public Services updateServiceDetails(ServiceDTO detachedService) {
	 * Services updatedService=mapper.map(detachedService, Services.class); return
	 * repo.save(updatedService); }
	 * 
	 * @Override public ServiceDTO getServiceByName(String name) { Services service=
	 * repo.findByServiceName(name).orElseThrow(()-> new
	 * ResourceNotFoundException("Service Not Found")); ServiceDTO
	 * serviceDTO=mapper.map(service, ServiceDTO.class); return serviceDTO; }
	 */

}
