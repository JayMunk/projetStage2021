package com.group1.stagesWs.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.group1.stagesWs.enums.Status;
import com.group1.stagesWs.model.CV;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.repositories.CVRepository;
import com.group1.stagesWs.repositories.OffreRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

@ExtendWith(MockitoExtension.class)
public class RapportServiceTests {

  @Mock
  private OffreRepository offreRepository;

  @InjectMocks
  private OffreService offreService;

  @Test
  void testGetAllOffresValide() {
    // Arrange
    Offre offre1 = getOffre(); // Constructeur met leur session par defaut a la session actuelle
    Offre offre2 = getOffre(); // Constructeur met leur session par defaut a la session actuelle
    Offre offre3 = getOffre(); // Constructeur met leur session par defaut a la session actuelle

    List<Offre> listOffre = List.of(offre1, offre2, offre3);
    when(offreRepository.findAllByIsValidTrue()).thenReturn(listOffre);

    // Act
    List<Offre> returned = offreService.getOffreValide();

    // Assert
    assertThat(returned.size())
        .isEqualTo(3);
  }

  private Offre getOffre() {
    Offre offre = new Offre();
    offre.setTitre("test");
    offre.setValid(true);
    return offre;
  }


}
