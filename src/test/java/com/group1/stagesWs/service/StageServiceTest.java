package com.group1.stagesWs.service;

import com.group1.stagesWs.model.Etudiant;
import com.group1.stagesWs.model.Offre;
import com.group1.stagesWs.model.User;
import com.group1.stagesWs.model.Whitelist;
import com.group1.stagesWs.repositories.OffreRepository;
import com.group1.stagesWs.repositories.WhitelistRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StageServiceTest {

    @Mock
    private OffreRepository offreRepository;

    @Mock
    private WhitelistRepository whitelistRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private StageService service;

    @Test
    void testGetAllOffres() {
        //Arrange
        List<Offre> expected = getOffres();
        when(offreRepository.findAll()).thenReturn(expected);

        //Act
        List<Offre> returned = service.getAllOffres();

        //Assert
        assertThat(returned).isEqualTo(expected);
    }

    @Test
    void testGetEtudiantOffres() {
        //Arrange
        List<Offre> expected = getOffres();
        String courriel = "etudiant@example.com";
        User etudiant = new Etudiant();
        when(offreRepository.findAllByVisibiliteEtudiantIsNullOrVisibiliteEtudiantIn(any(List.class))).thenReturn(expected);
        when(userService.findUserByCourriel(any(String.class))).thenReturn(Optional.of(etudiant));

        //Act
        List<Offre> returned = service.getEtudiantOffres(courriel);

        //Assert
        assertThat(returned).isEqualTo(expected);
    }

    @Test
    void testSaveOffre() {
        //Arrange
        Offre expected = getOffre();
        when(offreRepository.save(expected)).thenReturn(expected);

        //Act
        Optional<Offre> returned = service.saveOffre(expected);

        //Assert
        assertThat(returned).isEqualTo(Optional.of(expected));
    }

    @Test
    void testSaveWhitelist() {
        //Arrange
        Whitelist expected = new Whitelist();
        when(whitelistRepository.save(expected)).thenReturn(expected);

        //Act
        Optional<Whitelist> returned = service.saveWhitelist(expected);

        //Assert
        assertThat(returned).isEqualTo(Optional.of(expected));
    }

    private Offre getOffre() {
        return new Offre(
                "Developpeur Java",
                "Developpeur Java sur un projet de banque",
                "Banque NCA",
                false);
    }

    private Set<Etudiant> getEtudiants() {
        return Set.of(new Etudiant());
    }

    private List<Offre> getOffres() {
        return List.of(getOffre(), getOffre(), getOffre());
    }
}
