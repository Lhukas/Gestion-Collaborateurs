package com.gestioncollaborateurs;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.gestioncollaborateurs.controller.CollaborateursController;
import com.gestioncollaborateurs.service.CollaborateursService;


@SpringBootTest
@AutoConfigureMockMvc
public class CollaborateursControllerTest {
	
	
	
	@Autowired
	private MockMvc mockMvc;
	
	
	@MockBean
	private CollaborateursService cs;
	
	
	
	@Test
	private void testGetCollaborateurs() throws Exception{
		
		mockMvc.perform(get("/Collaborateurs"))
		.andExpect(status().isOk());
		
	}

}
