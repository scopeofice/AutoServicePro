package com.app.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
	@Table(name = "booking_service")
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public class BookingService {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;

	    @JsonBackReference
	    @ManyToOne(cascade = CascadeType.ALL)
	    @JoinColumn(name = "booking_id", nullable = false)
	    private Booking booking;

	    @OneToOne
	    @JoinColumn(name = "service_id", nullable = false)
	    private Services services;

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public void setBooking(Booking booking) {
			this.booking = booking;
		}

		public Services getServices() {
			return services;
		}

		public void setServices(Services services) {
			this.services = services;
		}
	

}
